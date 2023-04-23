import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AuctionCreateDto {
    @Field(() => Int)
    createdUserId: number

    @Field()
    startedAt: Date

    @Field()
    finishedAt: Date

    @Field()
    statusName: string

    // @Field(() => AuctionManufacturer)
    // manufacturers: [AuctionManufacturer]
}
