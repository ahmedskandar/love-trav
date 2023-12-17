import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Spinner } from "@nextui-org/react";
import { ChatFormProps } from "../../lib/types";
import { useState } from "react";

const ChatForm = ({ setUserMessage, isLoading, error }: ChatFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserMessage(input);
    setInput("");
  };

  const handleClick = () => {
    setUserMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={input}
        isDisabled={isLoading}
        radius="none"
        isInvalid={!!error}
        errorMessage={error}
        onValueChange={(value) => setInput(value)}
        placeholder="Enter message..."
        variant="flat"
        color="warning"
        endContent={
          isLoading ? (
            <Spinner color="warning" />
          ) : (
            <FontAwesomeIcon
              role="button"
              onClick={handleClick}
              icon={faArrowRight}
            />
          )
        }
      />
    </form>
  );
};

export default ChatForm;
