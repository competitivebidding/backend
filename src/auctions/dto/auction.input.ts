import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class AuctionInput {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    createdUserId?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    wonUserId?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    statusName?: string

    // @Field({ nullable: true })
    // @IsOptional()
    // @IsInt()
    // statusId?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    createdAt?: Date

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    finishedAt?: Date

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    startedAt?: Date
}

@InputType()
export class AuctionCreateInput {
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
    @IsInt()
    statusId: number

    // @Field(() => AuctionManufacturer)
    // manufacturers: [AuctionManufacturer]
}

@InputType()
export class AuctionUniqueInput {
    @Field(() => Int)
    @IsInt()
    id: number
}
