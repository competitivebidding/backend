import { ConfigService } from '@nestjs/config'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PayOperation, TypeNotifi } from '@prisma/client'
import { GetCurrentUserId } from '../../auth/decorators'
import NotifiInput from '../../notification/dto/notifi-create.input'
import { PayService } from '../../pay/pay.service'
import TypeOperation from '../../pay/utils/type-operation'
import { BidService } from './bid.service'
import { BidInput } from './dto/bid.input'
import { CreateBidInput } from './dto/create-bid.input'
import { UpdateBidInput } from './dto/update-bid.input'
import { Bid } from './entities/bid.entity'

@Resolver(() => Bid)
export class BidResolver {
    constructor(
        private readonly bidsService: BidService,
        private readonly emitter: EventEmitter2,
        private readonly config: ConfigService,
        private readonly payService: PayService,
    ) {}

    async onEvent(notification: NotifiInput, event: string) {
        await this.emitter.emit(event, notification)
    }

    @Query(() => [Bid])
    async getBidsByAuctionId(
        @Args('auctionId', { type: () => Int }) auctionId: number,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('where', { nullable: true, defaultValue: {} }) bidInput: BidInput,
    ) {
        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }
        const where = bidInput ? bidInput : {}
        const bids = await this.bidsService.getBids(skip, take, where, orderBy)
        return bids
    }

    @Query(() => Bid)
    async getBidById(@Args('bidId', { type: () => Int }) bidId: number) {
        const bid = await this.bidsService.getBidById(bidId)

        if (!bid) {
            throw new Error('Bid not found')
        }

        return bid
    }

    @Mutation(() => Bid)
    async createMyBid(@GetCurrentUserId() userId: number, @Args('input') input: CreateBidInput) {
        // TODO - check enough user token to do this
        // TODO - check if auction exists

        const { bitPrice, auctionId } = input

        const participants = await this.bidsService.countParticipantsWithoutUser(auctionId, userId)
        if (participants >= this.config.get<number>('MAX_PARTICIPANTS')) {
            throw new Error('cannot create a bid: max number of participants')
        }

        const isExistUserBid: boolean = await !!this.bidsService.getBidByUserId(userId)
        const highestPrice: Bid = await this.bidsService.getHighestPrice(bitPrice)

        const inputBid = {
            user: { connect: { id: userId } },
            auction: { connect: { id: auctionId } },
            bitPrice,
        }

        await this.payService.payOperation(
            {
                operation: PayOperation.debit,
                amount: bitPrice,
                typeOperation: TypeOperation.bit,
                user: { connect: { id: userId } },
            },
            userId,
        )

        const bid = await this.bidsService.createMyBid(inputBid)

        if (!bid) {
            await this.emitter.emit('pay', userId, {
                operation: PayOperation.refil,
                amount: bitPrice,
                typeOperation: TypeOperation.bitReturn,
            })

            throw new Error('Cannot create bid')
        }

        if (!isExistUserBid) {
            const notification: NotifiInput = {
                userId: userId,
                auctionId: auctionId,
                typeNotifi: TypeNotifi.joinAuction,
                message: `You joined to auction wish id ${auctionId}`,
            }
            await this.onEvent(notification, 'joinAuction')
        } else {
            if (highestPrice) {
                const notification: NotifiInput = {
                    userId: highestPrice.userId,
                    auctionId: auctionId,
                    typeNotifi: TypeNotifi.outBit,
                    message: `Your bet was outbid at the auction with id ${auctionId}`,
                }
                await this.onEvent(notification, 'outBid')
            }
        }

        return bid
    }

    @Mutation(() => Bid)
    async updateMyBid(
        @GetCurrentUserId() userId: number,
        @Args('bidId', { type: () => Int }) bidId: number,
        @Args('data') data: UpdateBidInput,
    ) {
        const bit = await this.bidsService.getBidById(data.id)

        const amount = data.bitPrice - bit.bitPrice

        await this.payService.payOperation(
            {
                operation: PayOperation.debit,
                amount: amount,
                typeOperation: TypeOperation.bitUpdate,
                user: { connect: { id: userId } },
            },
            userId,
        )

        // TODO - check enough user token to do this
        const updBid = await this.bidsService.updateMyBid(userId, bidId, data)

        if (!updBid) {
            await this.emitter.emit('pay', userId, {
                operation: PayOperation.refil,
                amount: amount,
                typeOperation: TypeOperation.bitReturn,
            })

            throw new Error('Cannot update bid')
        }

        return updBid
    }

    @Mutation(() => Boolean)
    async deleteMyBid(@GetCurrentUserId() userId: number, @Args('bidId', { type: () => Int }) bidId: number) {
        const bid = await this.bidsService.getBidById(bidId)
        if (bid.userId !== userId) {
            throw new Error('Cannot delete not your bid')
        }

        // TODO - check is this bit is the last !
        // get last Bid by Auction Id
        /*
        if() {
            throw new Error('Cannot delete record because it has been bitten')
        }
        */
        // TODO - return tokens to user

        if (!bid) {
            throw new Error('Cannot find bid that is being deleted')
        }
        return await this.bidsService.deleteMyBid(userId, bidId)
    }
}
