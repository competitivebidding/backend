import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../database/prisma.service'
import { MailService } from '../mail/mail.service'
import { UserService } from '../member/user/user.service'
import { RoomService } from './../chat/room/room.service'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password'
import { LogoutResponse } from './dto/logout.response'
import { SignInInput } from './dto/signin.input'
import { SignUpInput } from './dto/signup.input'
import { Tokens } from './utils/types/token.type'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private userService: UserService,
        private mailService: MailService,
        private roomService: RoomService,
    ) {}

    async signup(signUpInput: SignUpInput) {
        const { username, email } = signUpInput
        const hashedPassword = await bcrypt.hash(signUpInput.password, 10)

        const user = await this.prisma.user.create({
            data: {
                username: username,
                email: email,
                hashedPassword,
            },
        })

        const referalRoomId = await this.roomService.createReferRoom(user.id)
        await this.prisma.user.update({ where: { id: user.id }, data: { referalRoomId: referalRoomId } })

        const { accessToken, refreshToken } = await this.createTokens(user.id, user.email, user.role)
        await this.updateRefreshToken(user.id, refreshToken)

        return { accessToken, refreshToken, user }
    }

    async createTokens(userId: number, email: string, role: string): Promise<Tokens> {
        const accessToken = this.jwtService.sign(
            { userId, email, role },
            {
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRESIN'),
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            },
        )
        const refreshToken = this.jwtService.sign(
            { userId, email, role, accessToken },
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
        const { accessToken, refreshToken } = await this.createTokens(user.id, user.email, user.role)

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
        const { accessToken, refreshToken } = await this.createTokens(user.id, user.email, user.role)

        await this.updateRefreshToken(user.id, refreshToken)
        return { accessToken, refreshToken, user }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const user = await this.userService.getUserByEmail(forgotPasswordDto.email)
        if (!user) {
            throw new ForbiddenException('User not found')
        }

        const confirmationCode = Math.floor(10000 + Math.random() * 900000).toString()

        await this.userService.updateUser({
            where: { email: user.email },
            data: { confirmationCode: confirmationCode },
        })

        await this.mailService.sendForgotPasswordEmail(user.email, confirmationCode)

        return {
            message: 'Request Reset Forgot Successfully!',
        }
    }

    async changePassword(changePassword: ChangePasswordDto) {
        const { email, password, confirmationCode } = changePassword

        const user = await this.userService.getUserByEmail(email)
        if (!user && user.confirmationCode !== confirmationCode) {
            throw new ForbiddenException('User not found')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await this.userService.updateUser({
            where: {
                email: user.email,
            },
            data: {
                hashedPassword,
                confirmationCode: null,
            },
        })

        await this.mailService.sendChangePasswordEmail(user.email)
        return {
            message: 'Password reset success',
            success: true,
        }
    }

    async addUserInRefererRoom(roomId: number, userId: number) {
        await this.roomService.addUserInRefererRoom(roomId, userId)
    }
}
