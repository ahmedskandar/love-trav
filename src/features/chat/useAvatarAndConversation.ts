import { useUser } from "../../hooks/useUser";
import { User } from "../../lib/types";
import { useFetchConversation } from "./useFetchConversation";

export const useAvatarAndConversation = () => {
  const {
    user: {
      user_metadata: { avatar, clientChatSlug },
    }, 
  } = useUser() as { user: User };

  const { conversations, isPending: isFetchingConversation, error: conversationFetchError } = useFetchConversation({
    clientChatSlug: clientChatSlug,
  });

  return {
    avatar,
    conversations,
    isFetchingConversation,
    conversationFetchError,
  };
};
