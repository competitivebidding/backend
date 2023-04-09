import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator'
import { GetCurrentUser } from './decorators/get-current-user.decorator'
import { Public } from './decorators/public.decorator'
import { NewTokensResponse } from './dto'
import { LogoutResponse } from './dto/logout.response'
import { SignResponse } from './dto/sign.response'
import { SignInInput } from './dto/signin.input'
import { SignUpInput } from './dto/signup.input'
import { RefreshTokenGuard } from './guards'

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Mutation(() => SignResponse)
    signup(@Args('signUpInput') signUpInput: SignUpInput) {
        return this.authService.signup(signUpInput)
    }

    @Public()
    @Mutation(() => SignResponse)
    signin(@Args('signInInput') signInInput: SignInInput) {
        return this.authService.signin(signInInput)
    }

    //@UseGuards(AccessTokenGuard)
    @Mutation(() => LogoutResponse)
    logout(@Args('id', { type: () => Int }) id: number) {
        return this.authService.logout(id)
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Mutation(() => NewTokensResponse)
    getNewTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.getNewTokens(userId, refreshToken)
    }

    @Query(() => String)
    hello() {
        return 'Hello World!'
    }

    // @Mutation(() => Auth)
    // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    //     return this.authService.update(updateAuthInput.id, updateAuthInput)
    // }

    // @Mutation(() => Auth)
    // removeAuth(@Args('id', { type: () => Int }) id: number) {
    //     return this.authService.remove(id)
    // }
}
