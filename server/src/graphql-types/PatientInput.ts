import { InputType, Field } from "type-graphql";

@InputType()
export class PatientInput {
  @Field()
  email?: string;

  @Field()
  name?: string;

  @Field()
  address?: string;

  @Field()
  phone?: string;

  @Field()
  gender?: string;

  @Field()
  birthday?: string;

  @Field()
  insured?: boolean;
}
