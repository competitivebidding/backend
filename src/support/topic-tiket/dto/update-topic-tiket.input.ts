import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateTopicTiketInput {
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    title?: string

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    message?: string
}
