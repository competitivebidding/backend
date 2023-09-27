import { Field, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class ForgotPasswordDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}
