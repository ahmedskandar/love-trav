import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

const Chat = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${
        isOpen ? " w-96" : "w-60"
      } absolute bottom-14 right-14 z-50 transition-all duration-300`}
    >
      <ChatHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChatBody isOpen={isOpen} />
      {isOpen && <ChatForm />}
    </div>
  );
};

export default Chat;
