import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Referral {
    @Field(() => Int)
    userReferrerId: number

    @Field(() => Int)
    userReferralId: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
