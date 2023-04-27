import { Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator'
import { JwtPayload } from '../auth/utils/types'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User)
    getProfile(@GetCurrentUser() user: JwtPayload): Promise<User> {
        const { userId } = user
        return this.usersService.getUserById(userId)
    }

    @Query(() => [User])
    users(): Promise<User[]> {
        return this.usersService.getAllUsers()
    }

    // @Mutation(() => User)
    // createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    //     return this.usersService.createUser(createUserInput)
    // }
}
