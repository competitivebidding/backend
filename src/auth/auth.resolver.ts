import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ReferralService } from '../member/referral/referral.service'
import { UserService } from '../member/user/user.service'
import { AuthService } from './auth.service'
import { Roles } from './decorators'
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator'
import { GetCurrentUser } from './decorators/get-current-user.decorator'
import { Public } from './decorators/public.decorator'
import { NewTokensResponse } from './dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password'
import { LogoutResponse } from './dto/logout.response'
import { SignResponse } from './dto/sign.response'
import { SignInInput } from './dto/signin.input'
import { SignUpInput } from './dto/signup.input'
import { RefreshTokenGuard } from './guards'

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly referralService: ReferralService,
    ) {}

    @Public()
    @Mutation(() => SignResponse)
    async signup(@Args('signUpInput') signUpInput: SignUpInput) {
        const { email, referrerUserId } = signUpInput
        const existingUser = await this.userService.getUserByEmail(email)
        if (existingUser) {
            throw new NotFoundException('User with this email already exists.')
        }

        const signup = await this.authService.signup(signUpInput)

        if (referrerUserId) {
            // check exist Referrer User
            const existingReferrerUser = await this.userService.getUserById(referrerUserId)
            if (existingReferrerUser) {
                const {
                    user: { id: referralUserId },
                } = signup

                const referallUser = await this.referralService.create({
                    userReferrer: { connect: { id: referrerUserId } },
                    userReferral: { connect: { id: referralUserId } },
                })
                if (referallUser) {
                    // TODO - add token to user
                    // TODO - add token to referral-user
                }
            }
        }

        return signup
    }

    @Public()
    @Mutation(() => SignResponse)
    signin(@Args('signInInput') signInInput: SignInInput) {
        return this.authService.signin(signInInput)
    }

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

    // Example
    @Roles('ADMIN')
    @Query(() => String)
    secret() {
        return 'Secret admin area!'
    }

    @Public()
    @Mutation(() => ForgotPasswordDto)
    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto)
    }

    @Public()
    @Mutation(() => ChangePasswordDto)
    async changePassword(changePasswordDto: ChangePasswordDto) {
        return this.authService.changePassword(changePasswordDto)
    }
}
