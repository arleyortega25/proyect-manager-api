import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserUpdateDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usesrService: UsersService) {}
  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.usesrService.createUser(body);
  }
  @Get('all')
  public async findAllUsers() {
    return await this.usesrService.findUsers();
  }
  @Get(':id')
  public async findUsersById(@Param('id') id: string) {
    return await this.usesrService.findUserById(id);
  }
  @Put('update/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ) {
    return await this.usesrService.updateUser(body, id);
  }
  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usesrService.deleteUser(id);
  }
}
