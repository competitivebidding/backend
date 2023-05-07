import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        })
    }

    getUserById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: id },
            include: {
                address: true,
                payments: true,
                referrals: true,
            },
        })
    }

    getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email: email } })
    }

    getUsers(params: {
        skip?: number
        take?: number
        cursor?: Prisma.UserWhereUniqueInput
        where?: Prisma.UserWhereInput
        orderBy?: Prisma.UserOrderByWithRelationInput
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        })
    }

    updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
        const { where, data } = params
        return this.prisma.user.update({
            data,
            where,
        })
    }

    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        })
    }
}
