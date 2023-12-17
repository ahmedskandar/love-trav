import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChatHeaderProps } from "../../lib/types";

const ChatHeader = ({ isOpen, setIsOpen, botAvatar }: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between rounded-t bg-gradient-to-b from-yellow-600 to-yellow-500 p-1 pr-3">
      <div className="flex items-center gap-2">
        <img src={botAvatar} className="w-12" alt="" />
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
