export interface IUser {
  id: number;
  email: string;
  isAdmin: boolean;
}

export interface IMe {
  me: IUser | null;
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
