import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify your email to be able to use our services",
      );
      navigate("/login");
    },
    onError: (error) => toast.error(error.message),
  });

  return { signup, isSigningUp };
};
