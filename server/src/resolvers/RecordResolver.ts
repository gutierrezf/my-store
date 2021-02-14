import { Resolver, Mutation, Arg, Query, Int } from "type-graphql";
import { Record } from "../entity/Record";
import { RecordInput } from "../graphql-types/RecordInput";

@Resolver()
export class RecordResolver {
  @Mutation(() => Record)
  async createRecord(
    @Arg("input", () => RecordInput) recordInput: RecordInput
  ): Promise<Record> {
    const record = await Record.create(recordInput).save();

    return record;
  }

  @Mutation(() => Record, { nullable: true })
  async updateRecord(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => RecordInput) recordInput: RecordInput
  ): Promise<Record | undefined> {
    await Record.update({ id }, recordInput);

    return await Record.findOne({ id });
  }

  @Mutation(() => Record, { nullable: true })
  async deleteRecord(
    @Arg("id", () => Int) id: number
  ): Promise<Record | undefined> {
    const record = await Record.findOne({ id });
    await Record.delete({ id });

    return record;
  }

  @Query(() => Record, { nullable: true })
  async findRecord(
    @Arg("id", () => Int) id: number
  ): Promise<Record | undefined> {
    return await Record.findOne({ id });
  }

  @Query(() => Record, { nullable: true })
  async findRecordByPatient(
    @Arg("patientId", () => Int) patientId: number
  ): Promise<Record | undefined> {
    return await Record.findOne({ patientId });
  }

}
