import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @IsNotEmpty()
  @IsString()
  username: string;
}

export class UserUpdateDto extends PartialType(UserDto) {}

export class UserToProjectDto {
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;
  @IsNotEmpty()
  @IsUUID()
  project: ProjectEntity;
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  access_level: ACCESS_LEVEL;
}
