import { Spinner } from "@nextui-org/react";
import Heading from "../ui/Heading";
import { useEffect } from "react";

import Logo from "../ui/Logo";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import UpdateForm from "../features/update/UpdateForm";
import { params } from "../data/constants";

const Update = () => {
  const navigate = useNavigate();

  const { isAuthenticated, isPending: isAuthPending } = useUser();

  useEffect(() => {
    const showToast = (message: string) => {
      toast.error(message);
      setTimeout(
        //Timer is set to give a chance for the toast to display before navigating
        () => navigate("/", { replace: true }),
        1,
      );
    };

    const error = params.error_description;
    if (error) {
      showToast(error.replace(/\+/g, " "));
    } else if (!isAuthenticated && !isAuthPending) {
      showToast("Access denied");
    }
  }, [navigate, isAuthenticated, isAuthPending]);

  if (isAuthPending)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );
  return (
    <>
      {isAuthenticated && (
        <div className="mx-auto max-w-xl space-y-8 p-10">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Heading>Update your password</Heading>
          <UpdateForm />
        </div>
      )}
    </>
  );
};

export default Update;
