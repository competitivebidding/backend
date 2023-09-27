import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsInt, IsOptional } from 'class-validator'

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

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    statusId?: number

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
