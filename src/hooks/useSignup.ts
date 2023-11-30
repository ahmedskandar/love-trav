import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../services/apiAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate()
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupAPI,
    //fix onsuccess here and when its used: just use 1 which is here
    onSuccess: () => {
      toast.success("Account successfully created");
      navigate('/login')
    },
    onError: (error) => toast.error(error.message),
  });

  return { signup, isPending };
};
