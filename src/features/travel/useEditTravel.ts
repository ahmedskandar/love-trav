import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editTravel as editTravelAPI } from "../../services/apiTravels";

export const useEditTravel = () => {
  const queryClient = useQueryClient();
  const { mutate: editTravel, isPending: isTravelEditing } = useMutation({
    mutationFn: editTravelAPI,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["travels"],
      });
      toast.success("Travel successfully edited!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { editTravel, isTravelEditing };
};
