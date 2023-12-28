import { useQuery } from "@tanstack/react-query";
import { getTravels } from "../services/apiTravels";

export const useGetTravels = (id: string) => {
  const { isPending: isGettingTravels, data: travels } = useQuery({
    queryKey: ["travels"],
    queryFn: () => getTravels(id),
  });

  return {
    isGettingTravels,
    travels,
  };
};
