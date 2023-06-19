import { Field, Int, ObjectType } from '@nestjs/graphql'
import { TypeNotifi } from '@prisma/client'

@ObjectType()
export class Notification {
    @Field(() => Int)
    id: number

    @Field()
    auctionId: number

    @Field()
    userId: number

    @Field()
    message: string

    @Field()
    read: boolean

    @Field()
    typeNotifi: TypeNotifi
}
