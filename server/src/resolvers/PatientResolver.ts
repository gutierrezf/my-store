import { Resolver, Mutation, Arg, Query, Int } from "type-graphql";
import { Patient } from "../entity/Patient";
import { PatientInput } from "../graphql-types/PatientInput";

@Resolver()
export class PatientResolver {
  @Mutation(() => Patient)
  async createPatient(
    @Arg("input", () => PatientInput) patientInput: PatientInput
  ): Promise<Patient> {
    const patient = await Patient.create(patientInput).save();

    return patient;
  }

  @Mutation(() => Patient, { nullable: true })
  async updatePatient(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => PatientInput) patientInput: PatientInput
  ): Promise<Patient | undefined> {
    await Patient.update({ id }, patientInput);

    return await Patient.findOne({ id });
  }

  @Query(() => [Patient])
  async patients() {
    return await Patient.find();
  }

  @Query(() => Patient, { nullable: true })
  async findPatient(
    @Arg("id", () => Int) id: number
  ): Promise<Patient | undefined> {
    return await Patient.findOne({ id });
  }

  @Mutation(() => Patient, { nullable: true })
  async deletePatient(
    @Arg("id", () => Int) id: number
  ): Promise<Patient | undefined> {
    const patient = await Patient.findOne({ id });
    await Patient.delete({ id });

    return patient;
  }
}
