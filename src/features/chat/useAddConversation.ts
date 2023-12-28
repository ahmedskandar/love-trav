import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addConversation as addConversationAPI } from "../../services/apiChat";

export const useAddConversation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addConversation,
    error: addConversationError,
    isPending: isAddingConversation,
  } = useMutation({
    mutationFn: addConversationAPI,
    onSuccess: () => {
      // Invalidate or refetch a query after a successful mutation
      void queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  return { addConversation, addConversationError, isAddingConversation };
};
