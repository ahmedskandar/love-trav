import { useState } from "react";

import { rapidApiKey } from "../../data/constants";
import { useUser } from "../../hooks/useUser";
import { useAddConversation } from "./useAddConversation";
import { ConversationResponse, User } from "../../lib/types";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Spinner } from "@nextui-org/react";

const ChatForm = () => {
  const [input, setInput] = useState("");
  //Refactor this to the constants file
  const url = "https://lemurbot.p.rapidapi.com/chat";
  const {
    user: { user_metadata: {clientChatSlug} },
  } = useUser() as { user: User };
  const [isLoading, setIsLoading] = useState(false)
  const [botResponseError, setBotResponseError] = useState("")
  const { addConversation, error: addConversationError, isPending } = useAddConversation();

  //Refactor this to it's own custom hook. Try using react query
  const fetchData = async () => {
    try {
      setIsLoading(true)
      setBotResponseError("")
      //Send message to bot
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "lemurbot.p.rapidapi.com",
        },
        body: JSON.stringify({
          bot: "dilly",
          client: clientChatSlug,
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch: " + response.status + response.statusText,
        );
      }
      const conversationResponse = (await response.json()) as ConversationResponse;

      if (!conversationResponse) throw new Error("Empty response");

      const conv = {
        input: conversationResponse.data.conversation.input,
        output: conversationResponse.data.conversation.output,
        bot_id: conversationResponse.data.bot.id,
        client_slug: conversationResponse.data.client.slug,
      };
      //Add response to database. 
      void addConversation(conv);
    } catch (error) {
      //Catches only bot errors
      if (error instanceof Error) setBotResponseError("Error " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void fetchData();
    setInput("");
  };

  //Remove this after adding submit arrow
  const handleClick = () => {
    void fetchData();
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Change to text area and have a submit arrow button */}
      <Input
      isRequired
        value={input}
        isDisabled={isLoading || isPending}
        radius="none"
        isInvalid={!!botResponseError || !!addConversationError}
        errorMessage={botResponseError || addConversationError?.message}
        onValueChange={(value) => setInput(value)}
        placeholder="Enter message..."
        variant="flat"
        color="warning"
        endContent={
          isLoading ? (
            <Spinner color="warning" />
          ) : (

            <FontAwesomeIcon
            className=""
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
