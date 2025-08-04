import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/services/projects.service';

@Module({
  imports:[TypeOrmModule.forFeature([TasksEntity,ProjectEntity])],
  providers: [TaskService,ProjectsService],
  controllers: [TaskController]
})
export class TasksModule {}
