import { Field, Int, ObjectType } from '@nestjs/graphql'

/*
registerEnumType(ROLE, {
    name: 'UserRole',
})
*/

@ObjectType()
export class User {
    @Field(() => Int)
    id: number

    @Field()
    username: string

    @Field()
    email: string

    @Field({ nullable: true })
    firstname: string | null

    @Field({ nullable: true })
    lastname: string | null

    @Field({ nullable: true })
    patronymic: string | null

    @Field({ nullable: true })
    instagram: string | null

    //@Field(() => UserRole)
    //role: ROLE

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
