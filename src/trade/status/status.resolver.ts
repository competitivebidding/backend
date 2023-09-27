import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Status } from './entities/status.entity'
import { StatusService } from './status.service'

@Resolver(() => Status)
export class StatusResolver {
    constructor(private readonly statusService: StatusService) {}

    @Query(() => [Status])
    getAllAuctionStatuses() {
        return this.statusService.getAllAuctionStatuses()
    }

    @Query(() => Status)
    getAuctionStatusById(@Args('statusId', { type: () => Int }) statusId: number) {
        return this.statusService.getAuctionStatusById(statusId)
    }
}
