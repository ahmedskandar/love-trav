import { useState } from "react";

import { CHAT_URL, rapidApiKey } from "../../data/constants";
import { useUser } from "../../hooks/useUser";
import { useAddConversation } from "./useAddConversation";
import { ConversationResponse } from "../../lib/types";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Textarea } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";

const ChatForm = () => {
  const [input, setInput] = useState("");
  const {
    user: {
      user_metadata: { clientChatSlug },
    },
  } = useUser() as { user: User };
  const [isLoading, setIsLoading] = useState(false);
  const [botResponseError, setBotResponseError] = useState("");
  const {
    addConversation,
    error: addConversationError,
    isPending,
  } = useAddConversation();

  //Refactor this to it's own custom hook. Try using react query
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setBotResponseError("");
      //Send message to bot
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "lemurbot.p.rapidapi.com",
        },
        body: JSON.stringify({
          bot: "dilly",
          client: clientChatSlug as string,
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch: " + response.status + response.statusText,
        );
      }
      const conversationResponse =
        (await response.json()) as ConversationResponse;

      if (!conversationResponse) throw new Error("Empty response");

      const conv = {
        input: conversationResponse.data.conversation.input,
        output: conversationResponse.data.conversation.output,
        bot_id: conversationResponse.data.bot.id,
        client_slug: conversationResponse.data.client.slug,
      };
      //Add response to database. Has its own loading, error and pending state
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

  return (
    <form onSubmit={handleSubmit} className="flex ">
      <Textarea
        maxRows={2}
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
