import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class RoomUpdateInput {
    @Field(() => Int)
    @IsInt()
    @IsOptional()
    ownerId?: number

    @Field()
    @IsString()
    @IsOptional()
    title?: string

    @Field()
    @IsString()
    @IsOptional()
    description?: string

    @Field()
    @IsBoolean()
    @IsOptional()
    private?: boolean
}
