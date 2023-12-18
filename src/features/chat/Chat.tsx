import { useState } from "react";

import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
// USE ZOD FOR ANY NETWORK REQUEST DATA RECEIVED
const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);

  //Remove this and its props. Just access the avatar directly from queryClient
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
