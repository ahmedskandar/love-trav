import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export const useUser = () => {
  const { isPending: isGettingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isGettingUser,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
};
