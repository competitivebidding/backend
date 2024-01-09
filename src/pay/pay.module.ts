import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { UserService } from '../member/user/user.service'
import { PayResolver } from './pay.resolver'
import { PayService } from './pay.service'

@Module({
    providers: [PayResolver, PayService, PrismaService, UserService],
    exports: [PayService],
})
export class PayModule {}
