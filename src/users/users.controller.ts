import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

// TODO comments, tests
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async addUser(@Body() userData: User): Promise<User> {
    const userInDB = await this.usersService.userByEmail(userData.email)
    if (userInDB) {
      throw new ConflictException(`User with username ${userData.email} already exists}`);
    }

    const password = await this.authService.encodePassword(userData.password);
    return await this.usersService.createUser({ ...userData, password: password });
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  /*
  @Put(':id')
  async Update(@Param('id') id: number): Promise<User> {
    return this.usersService.updateUser(id);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
*/
}
