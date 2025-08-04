import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { UserProjectEntity } from 'src/users/entities/userProjects.entity';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectEntity,UserProjectEntity])],
  controllers: [ProjectsController,UsersService],
  providers: [ProjectsService]
})
export class ProjectsModule {}
