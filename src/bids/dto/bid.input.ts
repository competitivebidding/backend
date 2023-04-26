import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsInt, IsOptional } from 'class-validator'

@InputType()
export class BidInput {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    userId?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    auctionId?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    bitPrice?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    createdAt?: Date
}

@InputType()
export class BidUpdateInput {
    @Field(() => Int)
    @IsInt()
    bitPrice: number
}

@InputType()
export class BidCreateInput {
    @Field(() => Int)
    @IsInt()
    userId: number

    @Field(() => Int)
    @IsInt()
    auctionId: number

    @Field(() => Int)
    @IsInt()
    bitPrice: number
}
