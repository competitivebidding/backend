import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private readonly usersService: UsersService) {}

    async encodePassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        return hash(password, salt);
    }

    async generateToken(userData: string | object | Buffer): Promise<string> {
        return this.jwt.signAsync(userData, { secret: process.env.JWT_SECRET });
    }



}
