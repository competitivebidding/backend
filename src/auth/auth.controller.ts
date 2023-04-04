import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';


interface ICredentials {
    email: string;
    password: string;
}
@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() userCredentials: ICredentials): Promise<string> {
        const userInDB = await this.usersService.userByEmail(userCredentials.email)
        if (!userInDB) {
            throw new UnauthorizedException('Invalid user credentials');
        }

        if (!await compare(userCredentials.password, userInDB.password)) {
            throw new UnauthorizedException('Invalid user credentials');
        }

        return this.authService.generateToken(userInDB);
    }

}
