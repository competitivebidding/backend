import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User)
    async getProfile(@GetCurrentUserId() userId: number): Promise<User> {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }

    @Mutation(() => User)
    async editProfile(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @GetCurrentUserId() userId: number,
    ): Promise<User> {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return await this.userService.updateUser({ where: { id: userId }, data: updateUserInput })
    }
}
