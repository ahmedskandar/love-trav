import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addConversation as addConversationAPI } from "../../services/apiChat";
import { toast } from "sonner";

export const useAddConversation = () => {
  const queryClient = useQueryClient();
  const { mutate: addConversation, error, isPending } = useMutation({
    mutationFn: addConversationAPI,
    onSuccess: () => {
      // Invalidate or refetch a query after a successful mutation
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) =>
      toast.error("Error inserting conversation texts: " + error.message),
  });

  return { addConversation, error, isPending };
};
