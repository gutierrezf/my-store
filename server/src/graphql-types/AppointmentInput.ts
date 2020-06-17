import { InputType, Field } from "type-graphql";

@InputType()
export class AppointmentInput {
  @Field()
  title?: string;

  @Field()
  start?: string;

  @Field()
  end?: string;
}
