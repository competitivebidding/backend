import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateUserInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    username: string

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Field({ nullable: true })
    @IsString()
    firstname?: string

    @Field({ nullable: true })
    @IsString()
    lastname?: string

    @Field({ nullable: true })
    @IsString()
    patronymic?: string

    @Field({ nullable: true })
    @IsString()
    instagram?: string

    @Field({ nullable: true })
    @IsString()
    avatarUrl?: string
}
