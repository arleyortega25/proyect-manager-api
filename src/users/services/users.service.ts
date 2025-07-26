import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserUpdateDto } from '../dto/user.dto';
import { ErrorManager } from '../../../src/config/error.manager';

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
      const users: UserEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'result not founded',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findUserById(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity | null = await this.userRepository.findOneBy({
        id,
      });
      if (!user)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'result not founded',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async updateUser(
    body: UserUpdateDto,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'element can not be updated',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'element can not be deleted',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
