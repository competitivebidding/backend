import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { RoomResolver } from './room.resolver'
import { RoomService } from './room.service'

@Module({
    providers: [RoomResolver, RoomService, PrismaService],
    exports: [RoomService],
})
export class RoomModule {}
