import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'
import { LoginDto } from './login.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() userCredentials: LoginDto): Promise<string> {
        const userInDB = await this.usersService.getUserByEmail(userCredentials.email)
        // If there is no user with provided email, return 401 code
        if (!userInDB) {
            throw new UnauthorizedException('Invalid user credentials')
        }

        // If the provided password is incorrect, return 401 code
        if (!(await compare(userCredentials.password, userInDB.password))) {
            throw new UnauthorizedException('Invalid user credentials')
        }

        return this.authService.generateToken(userInDB.email)
    }
}
