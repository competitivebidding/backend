import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateMessageTiketInput {
    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    topicId?: number

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    fromWhomId?: number

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    toWhomId?: number

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    title?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    message?: string
}
