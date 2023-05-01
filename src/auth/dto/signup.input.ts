import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

@InputType()
export class SignUpInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    username: string

    @IsNotEmpty()
    @IsString()
    @Field()
    //@Validate(IsUserExist)
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must contain at least one uppercase and one lowercase letter, one number or special character, and must not contain spaces or line breaks.',
    })
    @Field()
    password: string
}
