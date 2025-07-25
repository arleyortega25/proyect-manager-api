import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserUpdateDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async createUser(body: UserDto): Promise<UserEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error.message || 'Unknown Error');
    }
  }
  public async findUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error.message || 'Unknown Error');
    }
  }
  public async findUserById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error(error.message || 'Unknown Error');
    }
  }
  public async updateUser(
    body: UserUpdateDto,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const user = await this.userRepository.update(id, body);
      if (user.affected === 0) return undefined;
      return user;
    } catch (error) {
      throw new Error(error.message || 'Unknown Error');
    }
  }
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) return undefined;
      return user;
    } catch (error) {
      throw new Error(error.message || 'Unknown Error');
    }
  }
}
