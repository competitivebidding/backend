import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator'
import { CreateAuctionInput } from './create-auction.input'

@InputType()
export class UpdateAuctionInput extends PartialType(CreateAuctionInput) {
    @Field()
    @IsNotEmpty()
    title: string

    @Field({ nullable: true })
    @IsOptional()
    description?: string

    @Exclude()
    @Field()
    @IsDate()
    startedAt: Date
}
