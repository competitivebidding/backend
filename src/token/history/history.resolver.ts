import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Roles } from '../../auth/decorators/roles.decorator'
import { TokenHistory } from '../../token/history/entities/token-history.entity'
import { HistoryTokenService } from '../../token/history/history.service'

@Resolver(() => TokenHistory)
export class TokenResolver {
    constructor(private readonly historyTokenService: HistoryTokenService) {}

    @Mutation(() => TokenHistory, { nullable: true })
    async getMyTokenHistoryById(@Args('id', { type: () => Int }) id: number): Promise<TokenHistory> {
        const tokenHistoryId = await this.historyTokenService.getMyTokenHistoryById(id)
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
        @Args('id', { type: () => Int }) id: number,
        @Args('data') data: Prisma.TokenHistoryUncheckedUpdateInput,
    ): Promise<TokenHistory> {
        const tokenHistoryId = await this.historyTokenService.getMyTokenHistoryById(id)
        if (!tokenHistoryId) {
            throw new Error('token history not found')
        }

        const updatedTokenHistory = await this.historyTokenService.updateMyTokenHistory(id, data)

        return updatedTokenHistory
    }

    @Roles('ADMIN')
    @Mutation(() => Boolean)
    async removeMyTokenHistory(@Args('id', { type: () => Int }) id: number) {
        const tokenHistoryId = await this.historyTokenService.removeMyTokenHistory(id)

        if (!tokenHistoryId) {
            throw new Error('token history not found')
        }

        await this.historyTokenService.removeMyTokenHistory(id)

        return true
    }
}
