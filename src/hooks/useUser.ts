import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export const useUser = () => {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    gcTime: 0 //change
  });

  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
};
