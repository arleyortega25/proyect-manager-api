import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASK } from 'src/constants/status-tasks';
import { ProjectDto } from 'src/projects/dto/projects.dto';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @IsNotEmpty()
  @IsString()
  taskDescription: string;
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;
  @IsNotEmpty()
  @IsString()
  responsableName: string;
  @IsOptional()
  project: ProjectDto;
}
