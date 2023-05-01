import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { PaymentResolver } from './payment.resolver'
import { PaymentService } from './payment.service'

@Module({
    providers: [PaymentResolver, PaymentService, PrismaService],
})
export class PaymentModule {}
