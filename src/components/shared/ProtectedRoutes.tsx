import { useEffect, ReactNode } from "react";
import { UseAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router";

interface ChildrenPropTypes {
  children: ReactNode
}

export const ProtectedRoutes = ({ children }: ChildrenPropTypes) => {

  const { user } = UseAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [navigate, user]);

  return children
};
