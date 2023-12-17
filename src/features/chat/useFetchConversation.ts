import { ConversationParams } from "../../lib/types";
import { fetchConversation as fetchConversationAPI } from "../../services/apiAuth";

import { useQuery } from "@tanstack/react-query";

export const useFetchConversation = (params: ConversationParams) => {
  const {
    data: conversations,
    error,
    isPending,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchConversationAPI(params),
  });

  return { conversations, error, isPending };
};
