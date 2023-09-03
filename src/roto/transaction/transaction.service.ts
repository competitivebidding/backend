import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { CreateTransactionInput } from './dto/create-transaction.input'

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) {}

    async income(createTransactionInput: CreateTransactionInput, id: number) {
        const user = await this.prisma.user.findFirst({ where: { id: id } })
        const balans = user.balance - +createTransactionInput.sum
        const isSuccess = await this.prisma.user.update({ data: { balance: balans }, where: { id: id } })
        if (isSuccess) {
            return await this.prisma.rotoTransaction.create({
                data: {
                    userId: createTransactionInput.userId,
                    sum: +createTransactionInput.sum,
                    type: createTransactionInput.type,
                    comments: createTransactionInput.comments,
                    card: createTransactionInput.cardId,
                },
            })
        }

        return await 'Something wrong'
    }

    async getAllMyTransaction(id: number) {
        return await this.prisma.rotoTransaction.findMany({ where: { userId: id } })
    }

    async debet(createTransactionInput: CreateTransactionInput, id: number) {
        const user = await this.prisma.user.findFirst({ where: { id: id } })
        const balans = user.balance - +createTransactionInput.sum
        if (balans > 0) {
            const isSuccess = await this.prisma.user.update({ data: { balance: balans }, where: { id: id } })
            if (isSuccess) {
                return await this.prisma.rotoTransaction.create({
                    data: {
                        userId: createTransactionInput.userId,
                        sum: +createTransactionInput.sum,
                        type: createTransactionInput.type,
                        comments: createTransactionInput.comments,
                        card: createTransactionInput.cardId,
                    },
                })
            }
            return await 'Something wrong'
        } else {
            return await "You don'n have enought money"
        }
    }
}
