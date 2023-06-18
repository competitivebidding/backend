import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { TokenHistory } from '../../token/history/entities/token-history.entity'
import { TokenHistoryService } from '../../token/history/history.service'
import { CreateHistoryDto } from './dto/create-history.input'

@Resolver(() => TokenHistory)
export class TokenResolver {
    constructor(private readonly historyTokenService: TokenHistoryService) {}

    @Mutation(() => TokenHistory, { nullable: true })
    async getMyTokenHistory(@GetCurrentUserId() input: CreateHistoryDto): Promise<TokenHistory[]> {
        return await this.historyTokenService.getAllTokenHistory(input)
    }

    @Mutation(() => TokenHistory, { nullable: true })
    async createMyTokenHistory(@Args('data') data: Prisma.TokenHistoryCreateInput): Promise<TokenHistory> {
        const tokenHistory = await this.historyTokenService.createMyTokenHistory(data)

        return tokenHistory
    }

    @Mutation(() => TokenHistory, { nullable: true })
    async updateMyTokenHistory(
        @GetCurrentUserId() userId: number,
        @Args('data') data: Prisma.TokenHistoryUncheckedUpdateInput,
    ): Promise<TokenHistory> {
        const updatedTokenHistory = await this.historyTokenService.updateMyTokenHistory(userId, data)

        return updatedTokenHistory
    }

    @Mutation(() => Boolean)
    async deleteMyTokenHistory(@GetCurrentUserId() userId: number) {
        await this.historyTokenService.deleteMyTokenHistory(userId)

        return true
    }
}
