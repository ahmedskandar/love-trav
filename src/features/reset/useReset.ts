import { useMutation } from "@tanstack/react-query";
import { reset as resetAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useReset = () => {
  const navigate = useNavigate();
  const { mutate: reset, isPending: isResetting } = useMutation({
    mutationFn: resetAPI,
    onSuccess: () => {
      toast.success(
        "Verification email has been sent! Please check your email for a link to complete the process.",
      );
      navigate("/login", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { reset, isResetting };
};
