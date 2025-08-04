import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto, ProjectUpdateDto } from '../dto/projects.dto';
import { ErrorManager } from 'src/config/error.manager';
import { UserProjectEntity } from 'src/users/entities/userProjects.entity';
import { ACCESS_LEVEL } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserProjectEntity)
    private readonly UserProjectRepository: Repository<UserProjectEntity>,  
    private readonly usesrService: UsersService
  ) {}
  public async CreateProject(body: ProjectDto, userid: string): Promise<ProjectEntity> {
    try {
      const user = await this.usesrService.findUserById(userid)
      const project = await this.projectRepository.create(body)
      await this.UserProjectRepository.save({
        accessLevel:ACCESS_LEVEL.OWNER,
        user:user,
        project: body
      })
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new Error(error.message || 'Unknown Error');
    }
  }
  public async findProjects(): Promise<ProjectEntity[]> {
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find();
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'result not founded',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findProjectById(id: string): Promise<ProjectEntity> {
    try {
      const project: ProjectEntity | null = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersInclude', 'usersInclude')
        .leftJoinAndSelect('usersInclude.user', 'user')
        .getOne();
      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'result not founded',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async updateProject(
    body: ProjectUpdateDto,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'element can not be updated',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'element can not be deleted',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
