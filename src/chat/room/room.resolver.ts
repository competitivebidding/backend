import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { User } from '../../users/entities/user.entity'
import { RoomFindManyInputType } from './dto/room-findMany.input'
import { RoomUpdateInputType } from './dto/room-update.input'
import { RoomInputType } from './dto/room.input'
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
    async getRoomById(@Args('id') id: number): Promise<Room> {
        return await this.roomService.getRoomById({ id })
    }

    @Query(() => [Room])
    async getRoom(@Args('dto') dto: RoomFindManyInputType): Promise<Room[]> {
        return await this.roomService.getRoom(dto)
    }

    @Query(() => [User])
    async getAllUsersByRoomId(@Args('roomId') roomId: number): Promise<User[]> {
        return await this.roomService.getAllUsersByRoomId(roomId)
    }

    @Query(() => [Room])
    async getAllRoomsByUserId(@GetCurrentUserId() userId: number): Promise<Room[]> {
        return await this.roomService.getAllRoomsByUserId(userId)
    }

    @Mutation(() => Room)
    async createRoom(@GetCurrentUserId() userId: number, @Args('roomDto') roomDto: RoomInputType): Promise<Room> {
        return await this.roomService.createRoom({ ...roomDto, ownerId: userId })
    }

    @Mutation(() => Room)
    async updateRoom(@GetCurrentUserId() userId: number, @Args('roomDto') roomDto: RoomUpdateInputType): Promise<Room> {
        return await this.roomService.updateRoom(userId, roomDto)
    }

    @Mutation(() => Room)
    async removeRoom(@GetCurrentUserId() userId: number, @Args('id') id: number): Promise<Room | null> {
        return await this.roomService.removeRoom({ id }, userId)
    }

    @Mutation(() => User)
    async joinUserRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<User> {
        return await this.roomService.joinUserRoom(userId, roomId)
    }

    @Mutation(() => User)
    async leftUserRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<User> {
        return await this.roomService.leftUserRoom(userId, roomId)
    }
}
