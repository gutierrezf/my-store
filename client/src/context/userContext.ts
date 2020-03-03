import { useState } from "react";
import constate from "constate";
import { IUser } from "../interfaces";

function useUserSate({ initialState = null }) {
  const [user, setUser] = useState<IUser | null>(initialState);
  const isLoggedIn = () => Boolean(user);
  const isAdmin = () => Boolean(user?.isAdmin);

  return { user, setUser, isLoggedIn, isAdmin };
}

const [UserProvider, useUserContext] = constate(useUserSate);

export { UserProvider, useUserContext };
