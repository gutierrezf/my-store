import { InputType, Field } from "type-graphql";

@InputType()
export class RecordInput {
  @Field(() => [String])
  knownConditions?: string[];

  @Field(() => [String])
  toxicRecord?: string[];

  @Field()
  medicRecord?: string;

  @Field()
  surgicalRecord?: string;

  @Field()
  allergies?: string;

  @Field()
  symptoms?: string;

  @Field()
  healthCondition?: string;

  @Field()
  physiatryEvaluation?: string;

  @Field()
  rightMotionArc?: string;

  @Field()
  leftMotionArc?: string;

  @Field()
  rightAnkylosis?: string;

  @Field()
  leftAnkylosis?: string;

  @Field()
  comments?: string;
}
