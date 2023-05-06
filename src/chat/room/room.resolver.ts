import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUser } from '../../auth/decorators/get-current-user.decorator'
import { JwtPayload } from '../../auth/utils/types'
import { User } from '../../users/entities/user.entity'
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
        return await this.roomService.getRoomById(id)
    }

    @Query(() => Room)
    async getRoomByTitle(@Args('title') title: string): Promise<Room[]> {
        return await this.roomService.getRoomByTitle(title)
    }

    @Query(() => [User])
    async getAllUsersInRoom(@Args('roomId') roomId: number): Promise<User[]> {
        return await this.roomService.getAllUsersInRoom(roomId)
    }

    @Query(() => [Room])
    async getAllUserRooms(@GetCurrentUser() user: JwtPayload): Promise<Room[]> {
        return await this.roomService.getAllUserRooms(user.userId)
    }

    @Mutation(() => Room)
    async createRoom(@GetCurrentUser() user: JwtPayload, @Args('roomDto') roomDto: RoomInputType): Promise<Room> {
        return await this.roomService.createRoom({ ...roomDto, owner: user.userId })
    }

    @Mutation(() => Room)
    async updateRoom(@GetCurrentUser() user: JwtPayload, @Args('roomDto') roomDto: RoomUpdateInputType): Promise<Room> {
        return await this.roomService.updateRoom(user.userId, roomDto)
    }

    @Mutation(() => Room)
    async removeRoom(@GetCurrentUser() user: JwtPayload, @Args('id') id: number): Promise<Room> {
        return await this.roomService.removeRoom(id, user.userId)
    }

    @Mutation(() => User)
    async joinUserRoom(@GetCurrentUser() user: JwtPayload, @Args('roomId') roomId: number): Promise<User> {
        return await this.roomService.joinUserRoom(user.userId, roomId)
    }

    @Mutation(() => User)
    async leftUserRoom(@GetCurrentUser() user: JwtPayload, @Args('roomId') roomId: number): Promise<User> {
        return await this.roomService.leftUserRoom(user.userId, roomId)
    }
}
