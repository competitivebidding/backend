import { Injectable } from '@nestjs/common'
import { Prisma, UserPayment } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserPaymentCreateInput): Promise<UserPayment | null> {
        return await this.prisma.userPayment.create({
            data,
        })
    }

    async findAll(where: Prisma.UserPaymentWhereInput): Promise<UserPayment[] | null> {
        return await this.prisma.userPayment.findMany({ where })
    }

    async findFirst(where: Prisma.UserPaymentWhereInput): Promise<UserPayment | null> {
        return await this.prisma.userPayment.findFirst({ where })
    }

    async findOne(where: Prisma.UserPaymentWhereUniqueInput): Promise<UserPayment | null> {
        return await this.prisma.userPayment.findUnique({ where })
    }

    async update(params: {
        where: Prisma.UserPaymentWhereUniqueInput
        data: Prisma.UserPaymentUpdateInput
    }): Promise<UserPayment | null> {
        const { where, data } = params
        return await this.prisma.userPayment.update({
            data,
            where,
        })
    }

    async remove(where: Prisma.UserPaymentWhereUniqueInput): Promise<UserPayment | null> {
        return await this.prisma.userPayment.delete({
            where,
        })
    }
}
