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
    firstname?: string

    @Field({ nullable: true })
    phone?: string

    @Field({ nullable: true })
    lastname?: string

    @Field({ nullable: true })
    patronymic?: string

    @Field({ nullable: true })
    instagram?: string

    @Field({ nullable: true })
    confirmationCode?: string

    //@Field(() => UserRole)
    //role: ROLE

    @Field()
    createdAt: Date

    @Field({ nullable: true })
    updatedAt: Date
}
