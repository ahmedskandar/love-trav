import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      //Removing user from react query cache
      queryClient.removeQueries();
      toast.error("Successfully logged out");
      navigate("/login");
    },
  });

  return { logout, isPending };
};
