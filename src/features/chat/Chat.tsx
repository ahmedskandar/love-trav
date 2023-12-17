import { useState } from "react";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [botAvatar, setBotAvatar] = useState("");
  return (
    <div className={`${isOpen ? " w-96" : "w-60"} transition-all duration-300`}>
      <ChatHeader botAvatar={botAvatar} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChatBody setBotAvatar={setBotAvatar} isOpen={isOpen} />
      {isOpen && <ChatForm />}
    </div>
  );
};

export default Chat;
