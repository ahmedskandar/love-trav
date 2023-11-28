import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Spinner } from "@nextui-org/react";
import { useUser } from "../hooks/useUser";
import { Children } from "../lib/types";

const ProtectedRoute = ({ children }: Children) => {
  const navigate = useNavigate();
  //Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  //If no authenticated user, redirect
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );

  return isAuthenticated && children; 
};

export default ProtectedRoute;
