import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../services/apiAuth";

export const useSignup = () => {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => alert("Account successfully created"),
    onError: (err) => alert(err.message),
  });

  return { signup, isPending };
};
