import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTravel as deleteTravelAPI } from "../../services/apiTravels";

export const useDeleteTravel = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTravel, isPending: isTravelDeleting } = useMutation({
    mutationFn: deleteTravelAPI,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["travels"],
      });
      toast.success("Travel successfully deleted!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteTravel, isTravelDeleting };
};
