import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { UserPublic } from '../../users/dto/user-public.response'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllRooms(): Promise<Room[]> {
        return await this.prisma.room.findMany()
    }

    async getRoom(where: Prisma.RoomWhereInput): Promise<Room> {
        return await this.prisma.room.findFirst({ where: where })
    }

    async getRooms(where: Prisma.RoomWhereInput): Promise<Room[]> {
        return await this.prisma.room.findMany({ where: where })
    }

    async createRoom(data: Prisma.RoomCreateInput): Promise<Room | null> {
        const room = await this.prisma.room.create({ data })
        if (room) {
            await this.prisma.userInRoom.create({ data: { userId: data.ownerId, roomId: room.id } })
            return room
        }
        return null
    }

    async updateRoom(roomId: number, data: Prisma.RoomUpdateInput): Promise<Room> {
        return await this.prisma.room.update({ where: { id: roomId }, data: data })
    }

    async removeRoom(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
        return await this.prisma.room.delete({ where: where })
    }

    async getAllUsersByRoomId(roomId: number): Promise<UserPublic[]> {
        return await this.prisma.user.findMany({ where: { rooms: { some: { roomId } } } })
    }

    async getAllRoomsByUserId(userId: number): Promise<Room[]> {
        return await this.prisma.room.findMany({ where: { users: { some: { userId } } } })
    }

    async joinToRoom(userId: number, roomId: number): Promise<UserPublic> {
        const user = await this.prisma.userInRoom.create({ data: { userId, roomId }, select: { user: true } })
        return user.user
    }

    async leaveFromRoom(userId: number, roomId: number): Promise<UserPublic> {
        const user = await this.prisma.userInRoom.delete({
            where: { userId_roomId: { userId, roomId } },
            select: { user: true },
        })
        return user.user
    }
}
