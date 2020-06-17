import { Resolver, Mutation, Arg, Query, Int } from "type-graphql";
import { Appointment } from "../entity/Appointment";
import { AppointmentInput } from "../graphql-types/AppointmentInput";

@Resolver()
export class AppointmentResolver {
  @Mutation(() => Appointment)
  async createAppointment(
    @Arg("input", () => AppointmentInput) appointmentInput: AppointmentInput
  ): Promise<Appointment> {
    const appointment = await Appointment.create(appointmentInput).save();

    return appointment;
  }

  @Mutation(() => Appointment, { nullable: true })
  async updateAppointment(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => AppointmentInput) appointmentInput: AppointmentInput
  ): Promise<Appointment | undefined> {
    await Appointment.update({ id }, appointmentInput);

    return await Appointment.findOne({ id });
  }

  @Query(() => [Appointment])
  async appointments() {
    return await Appointment.find();
  }

  @Query(() => Appointment, { nullable: true })
  async findAppointment(
    @Arg("id", () => Int) id: number
  ): Promise<Appointment | undefined> {
    return await Appointment.findOne({ id });
  }

  @Mutation(() => Appointment, { nullable: true })
  async deleteAppointment(
    @Arg("id", () => Int) id: number
  ): Promise<Appointment | undefined> {
    const appointment = await Appointment.findOne({ id });
    await Appointment.delete({ id });

    return appointment;
  }
}
