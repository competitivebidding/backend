import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    username?: string

    @Field({ nullable: true })
    @IsEmail()
    @IsOptional()
    email?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    phone?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstname?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastname?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    patronymic?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    instagram?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    avatarUrl?: string
}
