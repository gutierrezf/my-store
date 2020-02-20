import { useEffect, useReducer } from "react";
import constate from "constate";

function useUserSate({ initialState = false }) {
  const reducer = (user: any, newUser: any) => {
    if (newUser === null) {
      localStorage.removeItem("userData");
      return initialState;
    }
    return { ...user, ...newUser };
  };

  const storedData = localStorage.getItem("userData") || "{}";
  const localState = JSON.parse(storedData);

  const [user, setUser] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return { user, setUser };
}

const [UserProvider, useUserContext] = constate(useUserSate);

export { UserProvider, useUserContext };
