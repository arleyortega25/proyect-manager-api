import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorators';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usesrService: UsersService) {}
  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.usesrService.createUser(body);
  }

  @Roles('ADMIN')
  @Get('all')
  public async findAllUsers() {
    return await this.usesrService.findUsers();
  }
  @PublicAccess()
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
  @Post('add-project')
  public async addProject(@Body() body: UserToProjectDto) {
    return await this.usesrService.relationProject(body)
  }
}
