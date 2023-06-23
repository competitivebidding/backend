import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateStatusInput } from './create-status.input'

@InputType()
export class UpdateStatusInput extends PartialType(CreateStatusInput) {
    @Field(() => Int)
    id: number
}
