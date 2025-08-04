import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { TaskDto } from '../dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@Controller('task')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @AccessLevel(30)
  @Post('create/:projectId')
  public async createTask(
    @Body() body: TaskDto,
    @Param('projectId') projectId: string,
  ) {
    return this.taskService.creteTask(body, projectId);
  }
}
