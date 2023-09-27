import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class NewTokensResponse {
    @Field()
    accessToken: string

    @Field()
    refreshToken: string
}
