import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async addUser(@Body() userData: User): Promise<User> {
    const userInDB = await this.usersService.getUserByEmail(userData.email)
    // If the user with provided email already exists, return 409 code
    if (userInDB) {
      throw new ConflictException(`User with username ${userData.email} already exists}`);
    }

    const password = await this.authService.encodePassword(userData.password);
    return await this.usersService.createUser({ ...userData, password: password });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  /*
  @Put(':id')
  @UseGuards(AuthGuard)
  async Update(@Param('id') id: number): Promise<User> {
    return this.usersService.updateUser(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async Delete(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
*/
}
