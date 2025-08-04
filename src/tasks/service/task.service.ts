import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { TaskDto } from '../dto/task.dto';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly projectService: ProjectsService,
  ) {}
  public async creteTask(
    body: TaskDto,
    projectId: string,
  ): Promise<TasksEntity> {
    try {
      const project = await this.projectService.findProjectById(projectId);
      if(project === undefined){
        throw new ErrorManager({
            type:'NOT_FOUND',
            message:'project not found'
        })
      }
      return await this.taskRepository.save({
        ...body,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
