import { useMutation } from "@tanstack/react-query";
import { NewUser } from "../../lib/types";
import { useUser } from "../../hooks/useUser";
import { sendMessage as sendMessageAPI } from "../../services/apiChat";

export const useChatBotResponse = () => {
  const { user } = useUser();
  const newUser = user as NewUser;
  const { clientChatSlug } = newUser.user_metadata;

  const {
    mutate: sendMessage,
    isPending: isSendingMessage,
    error,
    data,
  } = useMutation({
    mutationFn: (input: string) => sendMessageAPI({ input, clientChatSlug }),
    
    // onError: (error) => toast.error(error.message),
  });

  return { sendMessage, isSendingMessage, error, data };
}

