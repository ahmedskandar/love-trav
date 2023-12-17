import { useState } from "react";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [botAvatar, setBotAvatar] = useState("")
  return (
    <div className={`${isOpen ? " w-96" : "w-60"} transition-all duration-300`}>
      <ChatHeader botAvatar={botAvatar} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChatBody
      setBotAvatar={setBotAvatar}
        userMessages={userMessages}
        setError={setError}
        setIsLoading={setIsLoading}
        isOpen={isOpen}
      />
      {isOpen && (
        <ChatForm
          setUserMessages={setUserMessages}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default Chat;
