import { useMutation } from "@tanstack/react-query";
import { NewUser } from "../../lib/types";
import { useUser } from "../../hooks/useUser";
import { sendMessage } from "../../lib/utils";

export const useChatBotResponse = () => {
  const { user } = useUser();
  const newUser = user as NewUser;
  const { clientChatSlug } = newUser.user_metadata;

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (input: string) => sendMessage({input, clientChatSlug}),
    // onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending, error, data };
}

