import { InputType, Field } from "type-graphql";

@InputType()
export class UserRoleInput {
  @Field()
  email: string;

  @Field()
  isAdmin: boolean;
}
