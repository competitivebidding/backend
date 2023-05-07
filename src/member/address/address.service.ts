import { Injectable } from '@nestjs/common'
import { Prisma, UserAddress } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserAddressCreateInput): Promise<UserAddress | null> {
        return await this.prisma.userAddress.create({
            data,
        })
    }

    async findAll(where: Prisma.UserAddressWhereInput): Promise<UserAddress[] | null> {
        return await this.prisma.userAddress.findMany({ where })
    }

    async findFirst(where: Prisma.UserAddressWhereInput): Promise<UserAddress | null> {
        return await this.prisma.userAddress.findFirst({ where })
    }

    async findOne(where: Prisma.UserAddressWhereUniqueInput): Promise<UserAddress | null> {
        return await this.prisma.userAddress.findUnique({ where })
    }

    async update(params: {
        where: Prisma.UserAddressWhereUniqueInput
        data: Prisma.UserAddressUpdateInput
    }): Promise<UserAddress | null> {
        const { where, data } = params
        return await this.prisma.userAddress.update({
            data,
            where,
        })
    }

    async remove(where: Prisma.UserAddressWhereUniqueInput): Promise<UserAddress | null> {
        return await this.prisma.userAddress.delete({
            where,
        })
    }
}
