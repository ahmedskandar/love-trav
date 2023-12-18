import { Fragment } from "react";

import { ChatBodyProps } from "../../lib/types";
import { Skeleton } from "@nextui-org/react";
import { useAvatarAndConversation } from "./useAvatarAndConversation";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";

const ChatBody = ({ isOpen }: ChatBodyProps) => {
  const {
    avatar,
    conversations,
    conversationFetchError,
    isFetchingConversation,
  } = useAvatarAndConversation();

  const { containerRef } = useScrollToBottom(conversations);

  return (
    <Skeleton isLoaded={!isFetchingConversation}>
    <div
      ref={containerRef}
      className={`${
        isOpen ? `max-h-52 overflow-auto p-2` : "max-h-0 overflow-hidden"
      } scrollbar h-52 rounded-b bg-gray-100 transition-all duration-300 ${
        conversationFetchError && "bg-red-500"
      }`}
    >
        {conversationFetchError && (
          <p className="pt-2">Error: {conversationFetchError.message}</p>
        )}
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conversation) => (
            <Fragment key={conversation.id}>
              <div className="flex flex-row-reverse items-center gap-2 rounded-md bg-yellow-50 p-1 pl-11">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={avatar || conversation.clients.image}
                  alt=""
                />
                <p>{conversation.input}</p>
              </div>
              <div className="flex items-center gap-2 p-1 pr-11">
                <img className="h-8 w-8" src={conversation.bot.image} alt="" />
                <p>{conversation.output}</p>
              </div>
            </Fragment>
          ))}
        {!isFetchingConversation && conversations?.length === 0 && (
          <p className="pt-2">Send a message to start a new conversation 💬</p>
        )}
    </div>
      </Skeleton>
  );
};

export default ChatBody;
