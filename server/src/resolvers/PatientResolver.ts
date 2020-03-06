import { Resolver, Mutation, Arg } from "type-graphql";
import { Patient } from "../entity/Patient";
import { PatientInput } from "../graphql-types/PatientInput";

@Resolver()
export class PatientResolver {
  @Mutation(() => Patient)
  async createPatient(
    @Arg("input") patientInput: PatientInput
  ): Promise<Patient> {
    const patient = await Patient.create(patientInput).save();

    return patient;
  }
}
