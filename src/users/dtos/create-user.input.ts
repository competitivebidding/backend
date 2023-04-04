import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsEmail()
  @Field()
  email: string;
}
