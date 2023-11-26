import { Field, InputType, Int } from '@nestjs/graphql'
import { TopicProcess } from '@prisma/client'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class FindAllTopicInput {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    title?: string

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    userId?: number

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    whoIsDoingId?: number

    @Field({ nullable: true })
    @IsOptional()
    process?: TopicProcess
}
