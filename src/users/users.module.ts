import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserProjectEntity } from './entities/userProjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,UserProjectEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
