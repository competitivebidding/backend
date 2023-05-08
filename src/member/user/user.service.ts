import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async existUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<boolean> {
        return await !!this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        })
    }

    async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        })
    }

    async getUserById(id: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id: id },
            include: {
                address: true,
                payments: true,
                referrals: true,
            },
        })
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { email: email } })
    }

    async getUsers(params: {
        skip?: number
        take?: number
        cursor?: Prisma.UserWhereUniqueInput
        where?: Prisma.UserWhereInput
        orderBy?: Prisma.UserOrderByWithRelationInput
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params
        return await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({
            data,
        })
    }

    async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
        const { where, data } = params
        return await this.prisma.user.update({
            data,
            where,
        })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return await this.prisma.user.delete({
            where,
        })
    }
}
