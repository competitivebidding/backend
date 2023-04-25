import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsInt, IsString } from 'class-validator'

@InputType()
export class AuctionCreateDto {
    @Field(() => Int)
    @IsInt()
    createdUserId: number

    @Field()
    @IsDate()
    startedAt: Date

    @Field()
    @IsDate()
    finishedAt: Date

    @Field()
    @IsString()
    statusName: string

    // @Field(() => AuctionManufacturer)
    // manufacturers: [AuctionManufacturer]
}
