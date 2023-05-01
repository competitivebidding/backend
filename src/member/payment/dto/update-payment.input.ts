import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreatePaymentInput } from './create-payment.input'

@InputType()
export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {
    @Field(() => Int, { nullable: true })
    id?: number
}
