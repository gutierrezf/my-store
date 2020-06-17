import { AuthResolver } from "./AuthResolver";
import { UserResolver } from "./UserResolver";
import { PatientResolver } from "./PatientResolver";
import { AppointmentResolver } from "./AppointmentResolver";

const resolvers = [
  AuthResolver,
  UserResolver,
  PatientResolver,
  AppointmentResolver,
];
export default resolvers;
