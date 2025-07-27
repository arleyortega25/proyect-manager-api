import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto, ProjectUpdateDto } from '../dto/projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post('new')
  public async newProject(@Body() body: ProjectDto) {
    return await this.projectService.CreateProject(body);
  }
  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }
  @Get(':id')
  public async findProjectsById(@Param('id') id: string) {
    return await this.projectService.findProjectById(id);
  }
  @Put('update/:id')
  public async updateProject(
    @Param('id') id: string,
    @Body() body: ProjectUpdateDto,
  ) {
    return await this.projectService.updateProject(body, id);
  }
  @Delete('delete/:id')
  public async deleteProject(@Param('id') id: string) {
    return await this.projectService.deleteProject(id);
  }
}
