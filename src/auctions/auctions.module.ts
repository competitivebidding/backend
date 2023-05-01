import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { UsersService } from '../user/users.service'
import { AuctionsResolver } from './auctions.resolver'
import { AuctionsService } from './auctions.service'

@Module({ providers: [AuctionsResolver, AuctionsService, PrismaService, UsersService] })
export class AuctionsModule {}
