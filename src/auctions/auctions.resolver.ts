import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Public } from '../auth/decorators'
import { UsersService } from '../users/users.service'
import { AuctionsService } from './auctions.service'
import { AuctionInput } from './dto/auction.input'
import { Auction } from './dto/auction.response'

@Resolver()
export class AuctionsResolver {
    constructor(private readonly auctionsService: AuctionsService, private readonly usersService: UsersService) {}

    @Public()
    @Query(() => [Auction])
    async getAllAuctions(
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('where', { nullable: true, defaultValue: {} }) auctionInput: AuctionInput,
    ) {
        const orderBy = {
            [sortBy || 'creationTime']: sortOrder,
        }
        const auctions = await this.auctionsService.auctions(skip, take, auctionInput, orderBy)
        return auctions
    }

    // @ResolveField('creatorId', (returns) => User)
    // async getCreator(@Parent() auction: Auction) {
    //     const { id } = auction
    //     return this.usersService.getUser(id)
    // }
    // @ResolveField('winnerId', (returns) => User)
    // async getWinner(@Parent() auction: Auction) {
    //     const { id } = auction
    //     return this.usersService.getUser(id)
    // }
}
