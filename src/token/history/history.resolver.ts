import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { Roles } from '../../auth/decorators/roles.decorator'
import { TokenHistory } from '../../token/history/entities/token-history.entity'
import { TokenHistoryService } from '../../token/history/history.service'

@Resolver(() => TokenHistory)
export class TokenResolver {
    constructor(private readonly historyTokenService: TokenHistoryService) {}

    @Mutation(() => TokenHistory, { nullable: true })
    async getMyTokenHistoryById(@GetCurrentUserId() userId: number): Promise<TokenHistory> {
        const tokenHistoryId= await this.historyTokenService.getMyTokenHistoryById(userId)
        if (!tokenHistoryId) {
            throw new Error('token history not found')
        }

        return tokenHistoryId
    }

    @Roles('ADMIN')
    @Mutation(() => TokenHistory, { nullable: true })
    async createMyTokenHistory(@Args('data') data: Prisma.TokenHistoryCreateInput): Promise<TokenHistory> {
        const tokenHistory = await this.historyTokenService.createMyTokenHistory(data)

        return tokenHistory
    }

    @Roles('ADMIN')
    @Mutation(() => TokenHistory, { nullable: true })
    async updateMyTokenHistory(
        @GetCurrentUserId() userId: number,
        @Args('data') data: Prisma.TokenHistoryUncheckedUpdateInput,
    ): Promise<TokenHistory> {
        const updatedTokenHistory = await this.historyTokenService.updateMyTokenHistory(userId, data)

        return updatedTokenHistory
    }

    @Roles('ADMIN')
    @Mutation(() => Boolean)
    async deleteMyTokenHistory(@GetCurrentUserId() userId: number,) {
        await this.historyTokenService.deleteMyTokenHistory(userId)

        return true
    }
}
