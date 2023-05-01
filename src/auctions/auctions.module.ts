import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { UserService } from '../member/user/user.service'
import { AuctionsResolver } from './auctions.resolver'
import { AuctionsService } from './auctions.service'

@Module({ providers: [AuctionsResolver, AuctionsService, PrismaService, UserService] })
export class AuctionsModule {}
