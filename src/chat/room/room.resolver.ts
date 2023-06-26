import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { UserPublic } from '../../member/user/dto/user-public.response'
import { AddUserInput } from './dto/room-addUser.input'
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
