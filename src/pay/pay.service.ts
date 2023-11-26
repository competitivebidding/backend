import { Injectable } from '@nestjs/common'
import { PayOperation, Prisma } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'
import { Pay } from './entities/pay.entity'
import { debitOperation, refilOperation } from './utils/pay-operation'

@Injectable()
export class PayService {
    constructor(private readonly prisma: PrismaService) {}

    async payOperation(data: Prisma.payLogCreateInput, user_id: number): Promise<Pay> {
        const user = await this.prisma.user.findFirst({ where: { id: user_id } })

        const balance =
            data.operation === PayOperation.debit
                ? debitOperation(user.balance, data.amount)
                : refilOperation(user.balance, data.amount)

        const [, payLog] = await this.prisma.$transaction([
            this.prisma.user.update({ where: { id: user_id }, data: { balance: +balance } }),
            this.prisma.payLog.create({ data }),
        ])

        return payLog
    }

    async findAllMyPayOperation(user_id: number): Promise<Pay[]> {
        return await this.prisma.payLog.findMany({ where: { user_id } })
    }

    async findOneMyPayOperation(user_id: number, id: number): Promise<Pay> {
        return await this.prisma.payLog.findFirst({ where: { user_id, id } })
    }
}
