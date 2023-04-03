import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { encodePassword, comparePasswords, generateToken } from '../Utils/auth';

// TODO comments
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async addUser(@Body() userData: UserModel): Promise<UserModel> {
    const password = await encodePassword(userData.password);
    return await this.usersService.createUser({ ...userData, password: password });
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserModel | null> {
    return this.usersService.getUser(id);
  }

  @Post('login')
  async login(@Body() userCredentials: UserModel): Promise<string> {
    // TODO add dto for login
    const userInDB = await this.usersService.getUserByEmail(userCredentials.email)
    if (!userInDB) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    if (!await comparePasswords(userCredentials.password, userInDB.password)) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return generateToken(userInDB, { secret: process.env.JWT_SECRET });
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
