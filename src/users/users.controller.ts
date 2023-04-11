import { Body, ConflictException, Controller, Get, Param, Post } from '@nestjs/common'
import { User } from '@prisma/client'
import { UsersService } from './users.service'
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getAllUsers()
    }

    @Post()
    async addUser(@Body() userData: User): Promise<User> {
        const userInDB = await this.usersService.getUserByEmail(userData.email)
        // If the user with provided email already exists, return 409 code
        if (userInDB) {
            throw new ConflictException(`User with username ${userData.email} already exists}`)
        }

        const hashedPassword = ''
        //await this.authService.encodePassword(userData.password)
        return await this.usersService.createUser({ ...userData, hashedPassword: hashedPassword })
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User | null> {
        return this.usersService.getUser(id)
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
