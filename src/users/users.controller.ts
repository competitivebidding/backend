import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { encodePassword } from '../Utils/password';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async addUser(@Body() userData: UserModel): Promise<UserModel> {
    const password_ = await encodePassword(userData.password);
    return this.usersService.createUser({ ...userData, password: password_ });
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserModel | null> {
    return this.usersService.getUser(id);
  }

  /*
  @Put(':id')
  async Update(@Param('id') id: number): Promise<UserModel> {
    return this.usersService.updateUser(id);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<UserModel> {
    return this.usersService.deleteUser(id);
  }
*/
}
