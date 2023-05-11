import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Roles } from '../../auth/decorators/roles.decorator'
import { TokenHistory } from '../../token/history/entities/token-history.entity'
import { HistoryTokenService } from '../../token/history/history.service'

@Resolver(() => TokenHistory)
export class TokenResolver {
    constructor(private readonly historyTokenService: HistoryTokenService) {}

    @Mutation(() => TokenHistory, { nullable: true })
    async getMyRoomById(@Args('id', { type: () => Int }) id: number): Promise<TokenHistory> {
        const roomId = await this.historyTokenService.getMyTokenHistoryById(id)
        if (!roomId) {
            throw new Error('Room not found')
        }

        return roomId
    }

    @Roles('ADMIN')
    @Mutation(() => TokenHistory, { nullable: true })
    async createMyTokenHistory(@Args('data') data: Prisma.TokenHistoryCreateInput): Promise<TokenHistory> {
        const createRoom = await this.historyTokenService.createMyTokenHistory(data)

        return createRoom
    }

    @Roles('ADMIN')
    @Mutation(() => TokenHistory, { nullable: true })
    async updateMyTokenHistory(
        @Args('id', { type: () => Int }) id: number,
        @Args('data') data: Prisma.TokenHistoryUncheckedUpdateInput,
    ): Promise<TokenHistory> {
        const token = await this.historyTokenService.getMyTokenHistoryById(id)
        if (!token) {
            throw new Error('Room not found')
        }

        const updatedRoom = await this.historyTokenService.updateMyTokenHistory(id, data)

        return updatedRoom
    }

    @Roles('ADMIN')
    @Mutation(() => Boolean)
    async removeMyTokenHistory(@Args('id', { type: () => Int }) id: number) {
        const roomId = await this.historyTokenService.removeMyTokenHistory(id)

        if (!roomId) {
            throw new Error('Room not found')
        }

        await this.historyTokenService.removeMyTokenHistory(id)

        return true
    }
}
