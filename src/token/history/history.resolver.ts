import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { TokenHistory } from '../../token/history/entities/token-history.entity'
import { HistoryService } from '../../token/history/history.service'
import { CreateHistoryInput } from './dto/create-history.input'
import { TokenHistoryInput } from './dto/tokenHistory.input'
import { UpdateHistoryInput } from './dto/update-history.token'

@Resolver(() => TokenHistory)
export class HistoryResolver {
    constructor(private readonly historyTokenService: HistoryService) {}

    @Mutation(() => [TokenHistory], { nullable: true })
    async getMyTokenHistories(
        @GetCurrentUserId() userId: number,
        @Args('input') input: TokenHistoryInput,
    ): Promise<TokenHistory[]> {
        const tokenHistoryInput = {
            tokenId: input.tokenId,
            userId: userId,
        }
        return await this.historyTokenService.getAllTokenHistories(tokenHistoryInput)
    }

    @Mutation(() => TokenHistory, { nullable: true })
    async createMyTokenHistory(
        @GetCurrentUserId() userId: number,
        @Args('input') input: CreateHistoryInput,
    ): Promise<TokenHistory> {
        const tokenHistoryInput = {
            token: { connect: { id: input.tokenId } },
            user: { connect: { id: userId } },
            price: input.price,
            points: input.points,
        }
        return await this.historyTokenService.createMyTokenHistory(tokenHistoryInput)
    }

    @Mutation(() => TokenHistory, { nullable: true })
    async updateMyTokenHistory(
        @GetCurrentUserId() userId: number,
        @Args('input') input: UpdateHistoryInput,
    ): Promise<TokenHistory> {
        const updatedTokenHistory = await this.historyTokenService.updateMyTokenHistory(userId, input)

        return updatedTokenHistory
    }
}
