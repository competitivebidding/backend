import { HttpStatus } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { ExeptionEnum } from 'src/common/exeptions/exeption.enum'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { UserPublic } from '../../member/user/dto/user-public.response'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomFindInput } from './dto/room-find.input'
import { RoomUpdateInput } from './dto/room-update.input'
import { Room } from './entities/room.entity'
import { RoomService } from './room.service'

@Resolver()
export class RoomResolver {
    constructor(private readonly roomService: RoomService) {}

    @Query(() => [Room])
    async getAllRooms(): Promise<Room[]> {
        return await this.roomService.getAllRooms()
    }

    @Query(() => Room)
    async getRoomById(@Args('roomId') roomId: number): Promise<Room> {
        return await this.roomService.getRoom({ id: roomId })
    }

    @Query(() => [Room])
    async getRooms(@Args('input') input: RoomFindInput): Promise<Room[]> {
        return await this.roomService.getRooms(input)
    }

    @Query(() => [UserPublic])
    async getAllUsersByRoomId(@Args('roomId') roomId: number): Promise<UserPublic[]> {
        return await this.roomService.getAllUsersByRoomId(roomId)
    }

    @Query(() => [Room])
    async getAllMyRooms(@GetCurrentUserId() userId: number): Promise<Room[]> {
        return await this.roomService.getAllRoomsByUserId(userId)
    }

    @Mutation(() => Room)
    async createRoom(@GetCurrentUserId() userId: number, @Args('input') input: RoomCreateInput): Promise<Room> {
        return await this.roomService.createRoom({ ...input, ownerId: userId })
    }

    @Mutation(() => Room)
    async updateRoom(
        @GetCurrentUserId() userId: number,
        @Args('roomId') roomId: number,
        @Args('input') input: RoomUpdateInput,
    ): Promise<Room> {
        const roomOwner = await this.roomService.getRoom({ id: roomId, ownerId: userId })
        if (roomOwner) {
            return await this.roomService.updateRoom(roomId, input)
        }
        throw new GraphQLError(ExeptionEnum.USER_NOT_OWNER_ROOM, {
            extensions: {
                code: 'FORBIDDEN',
                http: {
                    code: HttpStatus.FORBIDDEN,
                },
            },
        })
    }

    @Mutation(() => Room)
    async removeRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<Room> {
        const roomOwner = await this.roomService.getRoom({ id: roomId, ownerId: userId })
        if (roomOwner) {
            return await this.roomService.removeRoom({ id: roomId })
        }
        throw new GraphQLError(ExeptionEnum.USER_NOT_OWNER_ROOM, {
            extensions: {
                code: 'FORBIDDEN',
                http: {
                    code: HttpStatus.FORBIDDEN,
                },
            },
        })
    }

    @Mutation(() => UserPublic)
    async joinToRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<UserPublic> {
        return await this.roomService.joinToRoom(userId, roomId)
    }

    @Mutation(() => UserPublic)
    async leaveFromRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<UserPublic> {
        return await this.roomService.leaveFromRoom(userId, roomId)
    }
}
