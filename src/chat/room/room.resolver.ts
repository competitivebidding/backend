import { HttpStatus } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { ExeptionEnum } from '../../common/exeptions/exeption.enum'
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
        try {
            return await this.roomService.getAllRooms()
        } catch (error) {
            console.log('Error fetching all rooms: ', error)
            throw new GraphQLError('Failed fetching rooms', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Query(() => Room)
    async getRoomById(@Args('roomId') roomId: number): Promise<Room> {
        try {
            return await this.roomService.getRoom({ id: roomId })
        } catch (error) {
            console.log('Error fetching room by id: ', error)
            throw new GraphQLError('Failed fetching room', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Query(() => [Room])
    async getRooms(@Args('input') input: RoomFindInput): Promise<Room[]> {
        try {
            return await this.roomService.getRooms(input)
        } catch (error) {
            console.log('Error fetching room: ', error)
            throw new GraphQLError('Failed fetching room', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Query(() => [UserPublic])
    async getAllUsersByRoomId(@Args('roomId') roomId: number): Promise<UserPublic[]> {
        try {
            return await this.roomService.getAllUsersByRoomId(roomId)
        } catch (error) {
            console.log('Error fetching user by room id: ', error)
            throw new GraphQLError('Failed fetching room', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Query(() => [Room])
    async getAllMyRooms(@GetCurrentUserId() userId: number): Promise<Room[]> {
        try {
            return await this.roomService.getAllRoomsByUserId(userId)
        } catch (error) {
            console.log('Error fetching all my rooms: ', error)
            throw new GraphQLError('Failed fetching rooms', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Mutation(() => Room)
    async createRoom(@GetCurrentUserId() userId: number, @Args('input') input: RoomCreateInput): Promise<Room> {
        try {
            const room = await this.roomService.createRoom({ ...input, ownerId: userId })
            if (!room) {
                throw new GraphQLError(ExeptionEnum.ROOM_NOT_CREATED, {
                    extensions: {
                        code: 'NOT_ACCEPTABLE',
                        http: {
                            code: HttpStatus.NOT_ACCEPTABLE,
                        },
                    },
                })
            }
            return room
        } catch (error) {
            console.log('Error creating room: ', error)
            throw new GraphQLError('Failed creating room', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Mutation(() => Room)
    async updateRoom(
        @GetCurrentUserId() userId: number,
        @Args('roomId') roomId: number,
        @Args('input') input: RoomUpdateInput,
    ): Promise<Room> {
        try {
            const roomOwner = await this.roomService.getRoom({ id: roomId, ownerId: userId })
            if (!roomOwner) {
                throw new GraphQLError(ExeptionEnum.USER_NOT_OWNER_ROOM, {
                    extensions: {
                        code: 'FORBIDDEN',
                        http: {
                            code: HttpStatus.FORBIDDEN,
                        },
                    },
                })
            }
            return await this.roomService.updateRoom(roomId, input)
        } catch (error) {
            console.log('Error update room: ', error)
            throw new GraphQLError('Failed update room', { extensions: { code: 'SERVER ERROR', http: { code: 500 } } })
        }
    }

    @Mutation(() => Room)
    async removeRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<Room> {
        try {
            const roomOwner = await this.roomService.getRoom({ id: roomId, ownerId: userId })
            if (!roomOwner) {
                throw new GraphQLError(ExeptionEnum.USER_NOT_OWNER_ROOM, {
                    extensions: {
                        code: 'FORBIDDEN',
                        http: {
                            code: HttpStatus.FORBIDDEN,
                        },
                    },
                })
            }
            return await this.roomService.removeRoom({ id: roomId })
        } catch (error) {
            console.log('Error remove room: ', error)
            throw new GraphQLError('Failed remove room', { extensions: { code: 'SERVER ERROR', http: { code: 500 } } })
        }
    }

    @Mutation(() => UserPublic)
    async joinToRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<UserPublic> {
        try {
            return await this.roomService.joinToRoom(userId, roomId)
        } catch (error) {
            console.log('Error join room: ', error)
            throw new GraphQLError('Failed join room', { extensions: { code: 'SERVER ERROR', http: { code: 500 } } })
        }
    }

    @Mutation(() => UserPublic)
    async leaveFromRoom(@GetCurrentUserId() userId: number, @Args('roomId') roomId: number): Promise<UserPublic> {
        try {
            return await this.roomService.leaveFromRoom(userId, roomId)
        } catch (error) {
            console.log('Error leave room: ', error)
            throw new GraphQLError('Failed leave room', { extensions: { code: 'SERVER ERROR', http: { code: 500 } } })
        }
    }
}
