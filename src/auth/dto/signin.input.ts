import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class SignInInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    email: string

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string
}
