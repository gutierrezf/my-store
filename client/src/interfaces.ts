export interface IUser {
  id: number;
  email: string;
  isAdmin: boolean;
}

export interface IMe {
  me: IUser | null;
}

export interface IPatient {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  insured: boolean;
  gender: string;
  birthday: string;
}

export interface IRecord {
  id: number;
  patientId: number
  knownConditions: string[];
  toxicRecord: string[];
  medicRecord: string;
  surgicalRecord: string;
  allergies: string;
  symptoms: string;
  healthCondition: string;
  physiatryEvaluation: string;
  rightMotionArc: string;
  leftMotionArc: string;
  rightAnkylosis: string;
  leftAnkylosis: string;
  comments: string;
}

export interface IAppointment {
  id: number;
  title: string;
  desc?: string;
  start: string;
  end: string;
}

export interface IGraphqlError {
  path: string;
  message: string;
}

export interface IUserLogin {
  login: {
    errors: IGraphqlError[];
    user: IUser;
  };
}
