import { useMutation } from "@tanstack/react-query";
import { addConversation as addConversationAPI } from "../../services/apiAuth";
import { toast } from "sonner";

export const useAddConversation = () => {
  const { mutate: addConversation } = useMutation({
    mutationFn: addConversationAPI,
    onError: (error) => toast.error("Error inserting conversation texts: " + error.message),
  });

  return { addConversation };
};
