import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { UserPublic } from '../../member/user/dto/user-public.response'
import { ItemRooms } from './dto/item-rooms.response'
import { AddUserInput } from './dto/room-addUser.input'
import { RoomCreateInput } from './dto/room-create.input'
import { RoomUpdateInput } from './dto/room-update.input'
import { RoomResponse } from './dto/room.response'
import { Room } from './entities/room.entity'
import { RoomService } from './room.service'

@Resolver()
export class RoomResolver {
    constructor(private readonly roomService: RoomService) {}

    @Query(() => ItemRooms)
    async getAllRooms(
        @Args('search', { nullable: true }) search: string,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
    ): Promise<ItemRooms> {
        const where = search
            ? { OR: [{ title: { contains: search } }, { description: { contains: search } }], isPrivate: false }
            : { isPrivate: false }

        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }

        const [rooms, totalCount] = await Promise.all([
            this.roomService.getAllRooms(where, orderBy, skip, take),
            this.roomService.getTotalCount(where),
        ])

        return {
            items: rooms,
            totalCount,
        }
    }

    @Query(() => Room)
    async getRoomById(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<Room> {
        return await this.roomService.getRoomById(roomId, userId)
    }

    @Query(() => [UserPublic])
    async getAllUsersByRoomId(@Args('roomId') roomId: number): Promise<UserPublic[]> {
        return await this.roomService.getAllUsersByRoomId(roomId)
    }

    @Query(() => [RoomResponse])
    async getAllMyRooms(@GetCurrentUserId() userId: number): Promise<RoomResponse[]> {
        return await this.roomService.getAllRoomsByUserId(userId)
    }

    @Mutation(() => Room, { nullable: true })
    async createMyRoom(
        @GetCurrentUserId() userId: number,
        @Args('input') input: RoomCreateInput,
    ): Promise<Room | null> {
        return await this.roomService.createRoom({ ...input, owner: { connect: { id: userId } } })
    }

    @Mutation(() => Room, { nullable: true })
    async updateMyRoom(
        @GetCurrentUserId() userId: number,
        @Args('roomId') roomId: number,
        @Args('input') input: RoomUpdateInput,
    ): Promise<Room | null> {
        const roomOwner = await this.roomService.getRoom({ id: roomId, ownerId: userId })
        if (roomOwner) {
            return await this.roomService.updateRoom(roomId, input)
        }
        return null
    }

    @Mutation(() => Room, { nullable: true })
    async removeMyRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<Room | null> {
        const roomOwner = await this.roomService.getRoom({ id: roomId, ownerId: userId })
        if (roomOwner) {
            return await this.roomService.removeRoom({ id: roomId })
        }
        return null
    }

    @Mutation(() => UserPublic)
    async joinToRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<UserPublic> {
        return await this.roomService.joinToRoom(userId, roomId)
    }

    @Mutation(() => UserPublic)
    async leaveFromRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<UserPublic> {
        return await this.roomService.leaveFromRoom(userId, roomId)
    }

    @Mutation(() => UserPublic)
    async addUserInRoom(
        @GetCurrentUserId() ownerId: number,
        @Args('addUser') addUser: AddUserInput,
    ): Promise<UserPublic> {
        return await this.roomService.addUserInRoom(ownerId, addUser)
    }

    @Mutation(() => UserPublic)
    async removeUserInRoom(
        @GetCurrentUserId() ownerId: number,
        @Args('addUser') addUser: AddUserInput,
    ): Promise<UserPublic> {
        return await this.roomService.removeUserInRoom(ownerId, addUser)
    }
}
