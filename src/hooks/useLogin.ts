import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAPI({ email, password }),
    onSuccess: () => {
      toast.success("Successfully logged in")
      navigate("/app/travels");
    }, //Show toast and navigate
    onError: (error) => toast.error(error.message),
  });

  return { login, isPending };
};
