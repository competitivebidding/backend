import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { UserPublic } from './../../member/user/dto/user-public.response'
import { AddUserInput } from './dto/room-addUser.input'
import { RoomResponse } from './dto/room.response'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllRooms(where, orderBy, skip, take): Promise<RoomResponse[]> {
        return await this.prisma.room.findMany({
            where,
            orderBy,
            skip: skip || 0,
            take: take || 10,
            include: { owner: true, messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { content: true } } },
        })
    }

    async getRoom(where: Prisma.RoomWhereInput): Promise<Room> {
        return await this.prisma.room.findFirst({ where: where, include: { owner: true } })
    }

    async getRoomById(roomId: number, userId: number): Promise<Room> {
        const room = await this.prisma.room.findFirst({ where: { id: roomId }, include: { owner: true } })
        if (room.isPrivate === false) {
            return room
        }
        const userInRoom = await this.prisma.userInRoom.findFirst({
            where: { roomId: roomId, userId: userId },
        })
        if (userInRoom) {
            return room
        }
        throw new Error('This room is private')
    }

    async createRoom(data: Prisma.RoomCreateInput): Promise<Room | null> {
        const room = await this.prisma.room.create({ data, include: { owner: true } })
        if (room) {
            await this.prisma.userInRoom.create({ data: { userId: data.owner.connect.id, roomId: room.id } })
            return room
        }
        return null
    }

    async updateRoom(roomId: number, data: Prisma.RoomUpdateInput): Promise<Room> {
        return await this.prisma.room.update({ where: { id: roomId }, data: data, include: { owner: true } })
    }

    async removeRoom(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
        return await this.prisma.room.delete({ where: where, include: { owner: true } })
    }

    async getAllUsersByRoomId(roomId: number): Promise<UserPublic[]> {
        return await this.prisma.user.findMany({ where: { userInRooms: { some: { roomId } } } })
    }

    async getAllRoomsByUserId(userId: number): Promise<RoomResponse[]> {
        const test = await this.prisma.room.findMany({
            where: { users: { some: { userId } } },
            include: { owner: true, messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { content: true } } },
        })
        return test
    }

    async joinToRoom(userId: number, roomId: number): Promise<UserPublic> {
        const userInRoom = await this.prisma.userInRoom.findFirst({ where: { roomId, userId } })
        if (userInRoom) {
            throw new Error('The user is already in the room')
        }
        const room: Room = await this.prisma.room.findFirst({ where: { id: roomId }, include: { owner: true } })
        if (room.isPrivate === true) {
            throw new Error('This room is private')
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
        const room = await this.prisma.room.findFirst({ where: { id: addUser.roomId } })
        const isOwner: boolean = ownerId === room.ownerId

        if (isOwner) {
            const user = await this.prisma.userInRoom.create({
                data: { userId: addUser.userId, roomId: addUser.roomId },
                select: { user: true },
            })
            return user.user
        }
    }

    async removeUserInRoom(ownerId: number, addUser: AddUserInput): Promise<UserPublic> {
        const room = await this.prisma.room.findFirst({ where: { id: addUser.roomId } })
        const isOwner: boolean = ownerId === room.ownerId

        if (isOwner) {
            const user = await this.prisma.userInRoom.delete({
                where: { userId_roomId: { userId: addUser.userId, roomId: addUser.roomId } },
                select: { user: true },
            })
            return user.user
        }
    }

    async getTotalCount(where: any): Promise<number> {
        return this.prisma.room.count({
            where,
        })
    }
}
