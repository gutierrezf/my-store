import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType  } from "type-graphql";

@ObjectType()
@Entity()
export class Record extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [String])
  @Column("simple-array")
  knownConditions: string[];

  @Field(() => [String])
  @Column({type: "simple-array"})
  toxicRecord: string[];

  @Field()
  @Column()
  medicRecord: string;

  @Field()
  @Column()
  surgicalRecord: string;

  @Field()
  @Column()
  allergies: string;

  @Field()
  @Column()
  symptoms: string;

  @Field()
  @Column()
  healthCondition: string;

  @Field()
  @Column()
  physiatryEvaluation: string;

  @Field()
  @Column()
  rightMotionArc: string;

  @Field()
  @Column()
  leftMotionArc: string;

  @Field()
  @Column()
  rightAnkylosis: string;

  @Field()
  @Column()
  leftAnkylosis: string;

  @Field()
  @Column()
  comments: string;
}
