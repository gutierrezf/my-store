import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export interface ProtectedRouteProps {
  path: string;
  component: () => JSX.Element;
}

const ProtectedRoute = ({ path, component }: ProtectedRouteProps) => {
  const { isAdmin } = useUserContext();
  return isAdmin() ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={"/"} />
  );
};

export default ProtectedRoute;
