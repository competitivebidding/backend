import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../database/prisma.service'
import { LogoutResponse } from './dto/logout.response'
import { SignInInput } from './dto/signin.input'
import { SignUpInput } from './dto/signup.input'
import { Tokens } from './utils/types/token.type'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

    async signup(signUpInput: SignUpInput) {
        const hashedPassword = await bcrypt.hash(signUpInput.password, 10)

        const user = await this.prisma.user.create({
            data: {
                username: signUpInput.username,
                email: signUpInput.email,
                hashedPassword,
            },
        })
        const { accessToken, refreshToken } = await this.createTokens(user.id, user.email)
        await this.updateRefreshToken(user.id, refreshToken)
        return { accessToken, refreshToken, user }
    }

    async createTokens(userId: number, email: string): Promise<Tokens> {
        const accessToken = this.jwtService.sign(
            { userId, email },
            {
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRESIN'),
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            },
        )
        const refreshToken = this.jwtService.sign(
            { userId, email, accessToken },
            {
                expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRESIN'),
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            },
        )

        return { accessToken, refreshToken }
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
        await this.prisma.user.update({ where: { id: userId }, data: { hashedRefreshToken } })
    }

    async signin(signInInput: SignInInput) {
        const user = await this.prisma.user.findUnique({ where: { email: signInInput.email } })
        if (!user) {
            throw new ForbiddenException('Access Denied')
        }
        const doPasswordsMatch = await bcrypt.compare(signInInput.password, user.hashedPassword)
        if (!doPasswordsMatch) {
            throw new ForbiddenException('Access Denied')
        }
        const { accessToken, refreshToken } = await this.createTokens(user.id, user.email)

        await this.updateRefreshToken(user.id, refreshToken)
        return { accessToken, refreshToken, user }
    }

    async logout(userId: number): Promise<LogoutResponse> {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRefreshToken: { not: null },
            },
            data: { hashedRefreshToken: null },
        })

        return { loggedOut: true }
    }

    async getNewTokens(userId: number, rt: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        })
        if (!user || !user.hashedRefreshToken) {
            throw new ForbiddenException('Access Denied')
        }
        const dorefreshTokenMatch = await bcrypt.compare(rt, user.hashedRefreshToken)

        if (!dorefreshTokenMatch) {
            throw new ForbiddenException('Access Denied')
        }
        const { accessToken, refreshToken } = await this.createTokens(user.id, user.email)

        await this.updateRefreshToken(user.id, refreshToken)
        return { accessToken, refreshToken, user }
    }
}
