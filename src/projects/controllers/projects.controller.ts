import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto, ProjectUpdateDto } from '../dto/projects.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('projects')
@UseGuards(AuthGuard,RolesGuard,AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Roles('CREATOR')
  @Post('new/userOwner/:userid')
  public async newProject(@Body() body: ProjectDto, @Param('userid') userid: string) {
    return await this.projectService.CreateProject(body,userid);
  }
  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }
  @Get(':projectId')
  public async findProjectsById(@Param('projectId') id: string) {
    return await this.projectService.findProjectById(id);
  }
  @AccessLevel(50)
  @Put('update/:projectId')
  public async updateProject(
    @Param('projectId') id: string,
    @Body() body: ProjectUpdateDto,
  ) {
    return await this.projectService.updateProject(body, id);
  }
  @Delete('delete/:projectId')
  public async deleteProject(@Param('projectId') id: string) {
    return await this.projectService.deleteProject(id);
  }
}
