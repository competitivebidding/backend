import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { ErrorHandlerService } from '../../errorhandler/error-handler.service'
import { ExeptionEnum } from '../../errorhandler/exeption.enum'
import { UserPublic } from '../../member/user/dto/user-public.response'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService, private readonly errorHandler: ErrorHandlerService) {}

    async getAllRooms(): Promise<Room[]> {
        try {
            return await this.prisma.room.findMany()
        } catch (error) {
            console.log('Error fetching all rooms: ', error)
            this.errorHandler.errorHandler('Failed fetching all rooms')
        }
    }

    async getRoom(where: Prisma.RoomWhereInput): Promise<Room> {
        try {
            return await this.prisma.room.findFirst({ where: where })
        } catch (error) {
            console.log('Error fetching room: ', error)
            this.errorHandler.errorHandler('Failed fetching room')
        }
    }

    async getRooms(where: Prisma.RoomWhereInput): Promise<Room[]> {
        try {
            return await this.prisma.room.findMany({ where: where })
        } catch (error) {
            console.log('Error fetching rooms: ', error)
            this.errorHandler.errorHandler('Failed fetching rooms')
        }
    }

    async createRoom(data: Prisma.RoomCreateInput): Promise<Room | null> {
        try {
            const room = await this.prisma.room.create({ data })
            if (!room) {
                this.errorHandler.errorHandler(ExeptionEnum.ROOM_NOT_CREATED)
            }
            await this.prisma.userInRoom.create({ data: { userId: data.ownerId, roomId: room.id } })
            return room
        } catch (error) {
            console.log('Error creation room: ', error)
            this.errorHandler.errorHandler('Failed creation room')
        }
    }

    async updateRoom(userId: number, roomId: number, data: Prisma.RoomUpdateInput): Promise<Room> {
        try {
            const roomOwner = await this.getRoom({ id: roomId, ownerId: userId })
            if (!roomOwner) {
                this.errorHandler.errorHandler(ExeptionEnum.USER_NOT_OWNER_ROOM)
            }
            return await this.prisma.room.update({ where: { id: roomId }, data: data })
        } catch (error) {
            console.log('Error updates room: ', error)
            this.errorHandler.errorHandler('Failed updates room')
        }
    }

    async removeRoom(userId: number, roomId: number, where: Prisma.RoomWhereUniqueInput): Promise<Room> {
        try {
            const roomOwner = await this.getRoom({ id: roomId, ownerId: userId })
            if (!roomOwner) {
                this.errorHandler.errorHandler(ExeptionEnum.USER_NOT_OWNER_ROOM)
            }
            return await this.prisma.room.delete({ where: where })
        } catch (error) {
            console.log('Error delete room: ', error)
            this.errorHandler.errorHandler('Failed delete room')
        }
    }

    async getAllUsersByRoomId(roomId: number): Promise<UserPublic[]> {
        try {
            return await this.prisma.user.findMany({ where: { rooms: { some: { roomId } } } })
        } catch (error) {
            console.log('Error fetching user by room id: ', error)
            this.errorHandler.errorHandler('Failed fetching user')
        }
    }

    async getAllRoomsByUserId(userId: number): Promise<Room[]> {
        try {
            return await this.prisma.room.findMany({ where: { users: { some: { userId } } } })
        } catch (error) {
            console.log('Error fetching rooms by user id: ', error)
            this.errorHandler.errorHandler('Failed fetching room')
        }
    }

    async joinToRoom(userId: number, roomId: number): Promise<UserPublic> {
        try {
            const user = await this.prisma.userInRoom.create({ data: { userId, roomId }, select: { user: true } })
            return user.user
        } catch (error) {
            console.log('Error join to room: ', error)
            this.errorHandler.errorHandler('Failed join to room')
        }
    }

    async leaveFromRoom(userId: number, roomId: number): Promise<UserPublic> {
        try {
            const user = await this.prisma.userInRoom.delete({
                where: { userId_roomId: { userId, roomId } },
                select: { user: true },
            })
            return user.user
        } catch (error) {
            console.log('Error leave from room: ', error)
            this.errorHandler.errorHandler('Failed leave from room')
        }
    }
}
