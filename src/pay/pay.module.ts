import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { PayResolver } from './pay.resolver'
import { PayService } from './pay.service'

@Module({
    providers: [PayResolver, PayService, PrismaService],
})
export class PayModule {}
