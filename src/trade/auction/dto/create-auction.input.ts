import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class CreateAuctionInput {
    @Field()
    @IsNotEmpty()
    title: string

    @Field({ nullable: true })
    @IsOptional()
    description?: string

    @Field()
    @IsDate()
    startedAt: Date

    @Field()
    @IsDate()
    finishedAt: Date
}
