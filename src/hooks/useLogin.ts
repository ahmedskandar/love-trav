import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAPI({ email, password }),
    onSuccess: () => navigate("/app/travels", { replace: true }), //Show toast and navigate
    onError: (err) => alert(err.message + "WRONG EMAIL/PASS COMBO"),
  });

  return { login, isPending };
};
