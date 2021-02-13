import { AuthResolver } from "./AuthResolver";
import { UserResolver } from "./UserResolver";
import { PatientResolver } from "./PatientResolver";
import { AppointmentResolver } from "./AppointmentResolver";
import { RecordResolver } from "./RecordResolver";

const resolvers = [
  AuthResolver,
  UserResolver,
  PatientResolver,
  AppointmentResolver,
  RecordResolver
];
export default resolvers;
