import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { AddressResolver } from './address.resolver'
import { AddressService } from './address.service'

@Module({
    providers: [AddressResolver, AddressService, PrismaService],
})
export class AddressModule {}
