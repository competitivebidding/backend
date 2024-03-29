import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as randomstring from 'randomstring'
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
        const room = await this.prisma.room.findFirst({ where: where })
        if (room.isReferalRoom) {
            throw new Error('You cannot remove this room, becouse this room is referal')
        }
        return await this.prisma.room.delete({ where: where, include: { owner: true } })
    }

    async getAllUsersByRoomId(roomId: number): Promise<UserPublic[]> {
        return await this.prisma.user.findMany({ where: { userInRooms: { some: { roomId } } } })
    }

    async getAllRoomsByUserId(userId: number): Promise<RoomResponse[]> {
        const rooms = await this.prisma.room.findMany({
            where: { users: { some: { userId } } },
            include: { owner: true, messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { content: true } } },
        })
        return rooms
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

    async createReferRoom(userId: number): Promise<number> {
        const referalRoom = await this.prisma.room.create({
            data: {
                title: randomstring.generate(7),
                ownerId: userId,
                isPrivate: true,
                isReferalRoom: true,
            },
        })
        if (referalRoom) {
            await this.prisma.userInRoom.create({ data: { roomId: referalRoom.id, userId } })
        } else {
            throw new Error('Server error')
        }
        return referalRoom.id
    }

    async addUserInRefererRoom(roomId: number, userId: number) {
        await this.prisma.userInRoom.create({ data: { roomId, userId } })
    }

    async createInviteLink(userId: number, roomId: number): Promise<string> {
        const room = await this.prisma.room.findFirst({ where: { id: roomId } })
        if (room.ownerId !== userId) {
            throw new Error('User is not owner this room')
        }
        const link = await this.prisma.room.update({
            where: { id: roomId },
            data: { invateLink: randomstring.generate(15) },
            select: { invateLink: true },
        })

        return link.invateLink
    }

    async getInviteLink(userId: number, roomId: number): Promise<string> {
        const isUserInRoom = await this.prisma.userInRoom.findFirst({ where: { userId, roomId } })
        if (!isUserInRoom) {
            throw new Error('User not in this room')
        }
        const link = await this.prisma.room.findFirst({
            where: { id: roomId },
            select: { invateLink: true },
        })

        return link.invateLink
    }

    async joinToInviteRoom(userId: number, link: string): Promise<UserPublic> {
        const room = await this.prisma.room.findFirst({ where: { invateLink: link } })
        if (!room) {
            throw new Error('This link is no longer available or the room does not exist')
        }
        const user = await this.prisma.userInRoom.create({ data: { roomId: room.id, userId }, select: { user: true } })
        return user.user
    }
}
