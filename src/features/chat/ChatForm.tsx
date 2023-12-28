import { useEffect, useState } from "react";

import { useAddConversation } from "./useAddConversation";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Textarea } from "@nextui-org/react";
import { useChatBotResponse } from "./useChatBotResponse";

const ChatForm = () => {
  const [input, setInput] = useState("");

  const {
    botResponse,
    botResponseError,
    isSendingMessage,
    sendMessage,
  } = useChatBotResponse();

  const {
    addConversation,
    error: addConversationError,
    isAddingConversation,
  } = useAddConversation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  useEffect(() => {
    if (botResponse && !botResponseError) addConversation(botResponse);
  }, [botResponse, botResponseError, addConversation]);

  return (
    <form onSubmit={handleSubmit} className="flex ">
      <Textarea
        maxRows={2}
        isRequired
        value={input}
        isDisabled={isSendingMessage || isAddingConversation}
        radius="none"
        isInvalid={!!botResponseError || !!addConversationError}
        errorMessage={
          botResponseError?.message ?? addConversationError?.message
        }
        onValueChange={(value) => setInput(value)}
        placeholder="Enter message..."
        variant="flat"
        color="warning"
      />
      <div className="">
        <Button
          isLoading={isSendingMessage || isAddingConversation}
          type="submit"
          className="h-full"
          radius="none"
          isIconOnly
          color="warning"
          aria-label="Like"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </form>
  );
};

export default ChatForm;
