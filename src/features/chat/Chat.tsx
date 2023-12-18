import { useState } from "react";

import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
// USE ZOD FOR ANY NETWORK REQUEST DATA RECEIVED
const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`${isOpen ? " w-96" : "w-60"} transition-all duration-300`}>
      <ChatHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChatBody isOpen={isOpen} />
      {isOpen && <ChatForm />}
    </div>
  );
};

export default Chat;
