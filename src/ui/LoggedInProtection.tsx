import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Spinner } from "@nextui-org/react";
import { useUser } from "../hooks/useUser";

const LoggedInProtection = () => {
  const navigate = useNavigate();
  //Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  //If no authenticated user, redirect
  useEffect(() => {
    if (isAuthenticated && !isPending) navigate("/app/travels", {replace: true});
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );

  return !isAuthenticated && <Outlet />;
};

export default LoggedInProtection;
