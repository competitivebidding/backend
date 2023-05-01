import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    username: string

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string

    @IsEmail()
    @IsString()
    @Field()
    email: string
}
