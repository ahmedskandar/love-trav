import { useUser } from "../../hooks/useUser";
import { NewUser } from "../../lib/types";
import { useFetchConversation } from "./useFetchConversation";

export const useAvatarAndConversation = () => {


  const { user } = useUser();
  const newUser = user as NewUser;
  const { avatar, clientChatSlug } = newUser.user_metadata;

  const {
    conversations,
    isPending: isFetchingConversation,
    error: conversationFetchError,
  } = useFetchConversation({
    clientChatSlug: clientChatSlug,
  });

  return {
    avatar,
    conversations,
    isFetchingConversation,
    conversationFetchError,
  };
};
