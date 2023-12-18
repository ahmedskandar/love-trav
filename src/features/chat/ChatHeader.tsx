import { ChatHeaderProps, User } from "../../lib/types";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchConversation } from "./useFetchConversation";
import { useUser } from "../../hooks/useUser";
import { Skeleton } from "@nextui-org/react";

const ChatHeader = ({ isOpen, setIsOpen }: ChatHeaderProps) => {
  const {
    user: {
      user_metadata: { clientChatSlug },
    },
  } = useUser() as { user: User };
  //Remove setBotAvatar
  const { conversations, isPending } = useFetchConversation({
    clientChatSlug: clientChatSlug,
  });

  return (
    <header className="flex items-center justify-between rounded-t bg-gradient-to-b from-yellow-600 to-yellow-500 p-1 pr-3">
      <div className="flex items-center gap-2">
        <Skeleton className="rounded-full" isLoaded={!isPending}>
          <img
            src={conversations?.[conversations?.length - 1].bot.image}
            className="h-12 w-12 rounded-full object-cover"
            alt=""
          />
        </Skeleton>
        <span className="text-white">Travel Assistant</span>
      </div>
      <FontAwesomeIcon
        className={`cursor-pointer text-white transition duration-300 ${
          isOpen && " rotate-180"
        }`}
        icon={faArrowUp}
        onClick={() => setIsOpen((prevState) => !prevState)}
      />
    </header>
  );
};

export default ChatHeader;
