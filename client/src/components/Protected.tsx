import React from "react";
import { useUserContext } from "../context/userContext";

export interface ProtectedProps {
  onDefault?: () => JSX.Element | null;
  children: React.ReactNode;
}

const Protected = ({ children, onDefault = () => null }: ProtectedProps) => {
  const { user } = useUserContext();

  if (user?.isAdmin && children) {
    return <div>{children}</div>;
  }

  return onDefault();
};

export default Protected;
