import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { HistoryModule } from './history/history.module'
import { TokenResolver } from './token.resolver'
import { TokenService } from './token.service'

@Module({
    providers: [TokenResolver, TokenService, PrismaService],
    imports: [HistoryModule],
})
export class TokenModule {}
