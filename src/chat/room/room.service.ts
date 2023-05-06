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

    async getRoomById(id: number): Promise<Room> {
        return await this.prisma.room.findFirst({ where: { id: id } })
    }

    async getRoomByTitle(title: string): Promise<Room[]> {
        return await this.prisma.room.findMany({ where: { title: title } })
    }

    async createRoom(data: Prisma.RoomCreateInput): Promise<Room> {
        const room = await this.prisma.room.create({
            data: {
                owner: data.owner,
                title: data.title,
            },
        })
        await this.prisma.userInRoom.create({ data: { userId: data.owner, roomId: room.id } })
        return room
    }

    async updateRoom(userId: number, data: Prisma.RoomUpdateInput): Promise<Room> {
        return await this.prisma.room.update({ where: { id: userId }, data: data })
    }

    async removeRoom(id: number, userId: number): Promise<Room | null> {
        const user = await this.prisma.room.findFirst({ where: { id: id } })
        if (user.owner !== userId) {
            return null
        }
        return await this.prisma.room.delete({ where: { id: id } })
    }

    async getAllUsersInRoom(roomId: number): Promise<User[]> {
        const users = await this.prisma.userInRoom.findMany({ where: { roomId }, select: { user: true } })
        return users.map((user) => user.user)
    }

    async getAllUserRooms(userId: number): Promise<Room[]> {
        const rooms = await this.prisma.userInRoom.findMany({ where: { userId }, select: { room: true } })
        return rooms.map((room) => room.room)
    }

    async joinUserRoom(userId: number, roomId: number): Promise<User> {
        const user = await this.prisma.userInRoom.create({ data: { userId, roomId }, select: { user: true } })
        return user.user
    }

    async leftUserRoom(userId: number, roomId: number): Promise<User> {
        const user = await this.prisma.userInRoom.delete({
            where: { userId_roomId: { userId, roomId } },
            select: { user: true },
        })
        return user.user
    }
}
