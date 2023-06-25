import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { UserPublic } from './../../member/user/dto/user-public.response'
import { AddUserInput } from './dto/room-addUser.input'
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
        const userInRoom = await this.prisma.userInRoom.findFirst({ where: { roomId, userId } })
        if (userInRoom) {
            throw new Error('The user is already in the room')
        }
        const user = await this.prisma.userInRoom.create({ data: { userId, roomId }, select: { user: true } })
        return user.user
    }

    async leaveFromRoom(userId: number, roomId: number): Promise<UserPublic> {
        const userInRoom = await this.prisma.userInRoom.findFirst({ where: { roomId, userId } })
        if (!userInRoom) {
            throw new Error('The user is not in the room')
        }

        const user = await this.prisma.userInRoom.delete({
            where: { userId_roomId: { userId, roomId } },
            select: { user: true },
        })

        const isPeopleInRoom: boolean = await !!this.prisma.userInRoom.findFirst({ where: { roomId } })
        if (!isPeopleInRoom) {
            await this.prisma.room.delete({ where: { id: roomId } })
        }
        return user.user
    }

    async addUserInRoom(ownerId: number, addUser: AddUserInput): Promise<UserPublic> {
        const isOwner =
            ownerId === (await this.prisma.room.findFirst({ where: { id: addUser.roomId } })).ownerId ? true : false

        if (isOwner) {
            const user = await this.prisma.userInRoom.create({
                data: { userId: addUser.userId, roomId: addUser.roomId },
                select: { user: true },
            })
            return user.user
        }
    }

    async removeUserInRoom(ownerId: number, addUser: AddUserInput): Promise<UserPublic> {
        const isOwner =
            ownerId === (await this.prisma.room.findFirst({ where: { id: addUser.roomId } })).ownerId ? true : false

        if (isOwner) {
            const user = await this.prisma.userInRoom.delete({
                where: { userId_roomId: { userId: addUser.userId, roomId: addUser.roomId } },
                select: { user: true },
            })
            return user.user
        }
    }
}
