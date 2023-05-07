import { Field, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class ChangePasswordDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string

    @Field()
    @IsNotEmpty()
    @IsString()
    confirmationCode: string
}
