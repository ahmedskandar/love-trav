import { useEffect, useState } from "react";

import { useAddConversation } from "./useAddConversation";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Textarea } from "@nextui-org/react";
import { useChatBotResponse } from "./useChatBotResponse";

const ChatForm = () => {
  const [input, setInput] = useState("");
  const {
    data,
    error: botResponseError,
    isPending: isLoading,
    mutate,
  } = useChatBotResponse();
  const {
    addConversation,
    error: addConversationError,
    isPending,
  } = useAddConversation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(input);
    setInput("");
  };

  useEffect(() => {
    if (data && !botResponseError) addConversation(data);
  }, [data, botResponseError, addConversation]);

  return (
    <form onSubmit={handleSubmit} className="flex ">
      <Textarea
        maxRows={2}
        isRequired
        value={input}
        isDisabled={isLoading || isPending}
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
          isLoading={isLoading || isPending}
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
