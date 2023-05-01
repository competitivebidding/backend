import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from 'class-validator'
import { IsUserExist } from '../../user/dto/user-exist.validator'

@InputType()
export class NewsCreateInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    imageUrl?: string

    @Field(() => Int)
    @IsInt()
    @Validate(IsUserExist)
    userId: number
}
