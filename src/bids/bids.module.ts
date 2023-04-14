import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { BidsResolver } from './bids.resolver'
import { BidsService } from './bids.service'

@Module({ providers: [PrismaService, BidsService, BidsResolver] })
export class BidsModule {}
