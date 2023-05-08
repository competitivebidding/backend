import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { User } from './../../users/entities/user.entity'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllRooms(): Promise<Room[]> {
        return await this.prisma.room.findMany()
    }

    async getRoomById(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
        return await this.prisma.room.findFirst({ where: where })
    }

    async getRooms(where: Prisma.RoomWhereInput): Promise<Room[]> {
        return await this.prisma.room.findMany({ where: where })
    }

    async createRoom(data: Prisma.RoomCreateInput): Promise<Room> {
        const room = await this.prisma.room.create({ data })
        await this.prisma.userInRoom.create({ data: { userId: data.ownerId, roomId: room.id } })
        return room
    }

    async updateRoom(userId: number, data: Prisma.RoomUpdateInput): Promise<Room> {
        return await this.prisma.room.update({ where: { id: userId }, data: data })
    }

    async removeRoom(where: Prisma.RoomWhereUniqueInput, userId: number): Promise<Room | null> {
        const user = await this.prisma.room.findFirst({ where: where })
        if (user.ownerId !== userId) {
            return null
        }
        return await this.prisma.room.delete({ where: where })
    }

    async getAllUsersByRoomId(roomId: number): Promise<User[]> {
        return await this.prisma.user.findMany({ where: { rooms: { some: { roomId } } } })
    }

    async getAllRoomsByUserId(userId: number): Promise<Room[]> {
        return await this.prisma.room.findMany({ where: { users: { some: { userId } } } })
    }

    async joinUserRoom(userId: number, roomId: number): Promise<User> {
        const user = await this.prisma.userInRoom.create({ data: { userId, roomId }, select: { user: true } })
        return user.user
    }

    async leaveFromRoom(userId: number, roomId: number): Promise<User> {
        const user = await this.prisma.userInRoom.delete({
            where: { userId_roomId: { userId, roomId } },
            select: { user: true },
        })
        return user.user
    }
}
