import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsOptional } from 'class-validator'

@InputType()
export class WhereBidInput {
    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    wonUser?: boolean

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    statusId?: number
}
