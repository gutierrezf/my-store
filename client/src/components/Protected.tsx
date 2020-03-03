import React from "react";
import { useUserContext } from "../context/userContext";

export interface ProtectedProps {
  onDefault?: () => JSX.Element | null;
  authOnly?: boolean;
  children: React.ReactNode;
}

const Protected = ({
  children,
  onDefault = () => null,
  authOnly = false
}: ProtectedProps) => {
  const { user } = useUserContext();

  if (((authOnly && user) || user?.isAdmin) && children) {
    return <>{children}</>;
  }

  return onDefault();
};

export default Protected;
