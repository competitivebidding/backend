import { Module } from '@nestjs/common'
import { PrismaService } from './../../database/prisma.service'
import { TransactionResolver } from './transaction.resolver'
import { TransactionService } from './transaction.service'

@Module({
    providers: [TransactionResolver, TransactionService, PrismaService],
})
export class TransactionModule {}
