import { User } from "@supabase/supabase-js";
import { useUser } from "../../hooks/useUser";
import { useFetchConversation } from "./useFetchConversation";

export const useAvatarAndConversation = () => {
  const {
    user: {
      user_metadata: { avatar, clientChatSlug },
    }, 
  } = useUser() as { user: User };

  const { conversations, isPending: isFetchingConversation, error: conversationFetchError } = useFetchConversation({
    clientChatSlug: clientChatSlug as string,
  });

  return {
    avatar: avatar as string,
    conversations,
    isFetchingConversation,
    conversationFetchError,
  };
};
