import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateRotoInput } from './create-roto.input'

@InputType()
export class UpdateRotoInput extends PartialType(CreateRotoInput) {
    @Field(() => Int)
    id: number
}
