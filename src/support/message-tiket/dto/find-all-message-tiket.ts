import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class FindAllMessageTiket {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    topicId?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    toWhomId?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    fromWhomId?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    title?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    message?: string
}
