import { ChatHeaderProps } from "../../lib/types";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Skeleton } from "@nextui-org/react";
import { useAvatarAndConversation } from "./useAvatarAndConversation";

const ChatHeader = ({ isOpen, setIsOpen }: ChatHeaderProps) => {
  const { conversations, isFetchingConversation } = useAvatarAndConversation();
  return (
    <header className="flex items-center justify-between rounded-t bg-gradient-to-b from-yellow-600 to-yellow-500 p-1 pr-3">
      <div className="flex items-center gap-2">
        <Skeleton className="rounded-full" isLoaded={!isFetchingConversation}>
          <Avatar
          
            src={conversations?.[conversations?.length - 1]?.bot?.image}
            className="h-12 w-12 rounded-full bg-transparent object-cover text-white"
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
