import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class ForgotPasswordDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    email: string
}
