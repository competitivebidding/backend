import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUser } from '../../auth/decorators'
import { JwtPayload } from '../../auth/utils/types'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User)
    getProfile(@GetCurrentUser() user: JwtPayload): Promise<User> {
        const { userId } = user
        return this.userService.getUserById(userId)
    }

    @Mutation(() => User)
    editProfile(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @GetCurrentUser() user: JwtPayload,
    ): Promise<User> {
        const { userId } = user
        return this.userService.getUserById(userId)
    }
}
