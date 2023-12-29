import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addTravel as addTravelAPI } from "../../services/apiTravels";

export const useAddTravel = () => {
  const queryClient = useQueryClient();
  const { mutate: addTravel, isPending: isTravelAdding } = useMutation({
    mutationFn: addTravelAPI,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["travels"],
      });
      toast.success("Travel successfully added!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { addTravel, isTravelAdding };
};
