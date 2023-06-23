import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional } from 'class-validator'

@InputType()
export class UserMessages {
    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    userId?: number

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    roomId?: number
}
