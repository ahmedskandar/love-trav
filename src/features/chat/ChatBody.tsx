import { Fragment, useEffect, useRef } from "react";
import { ChatBodyProps, ConversationResponse, User } from "../../lib/types";
import { useUser } from "../../hooks/useUser";
import { rapidApiKey } from "../../data/constants";
import { useAddConversation } from "./useAddConversation";
import { useFetchConversation } from "./useFetchConversation";

const ChatBody = ({
  setError,
  setIsLoading,
  userMessage,
  isOpen,
  setBotAvatar,
}: ChatBodyProps) => {
  const {
    user: { user_metadata },
  } = useUser() as { user: User };
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const { addConversation } = useAddConversation();
  const { conversations, isPending, error } = useFetchConversation({
    clientChatSlug: user_metadata.clientChatSlug,
    setBotAvatar,
  });

  const url = "https://lemurbot.p.rapidapi.com/chat";

  useEffect(() => {
    if (!userMessage) return;
    setIsLoading(true);
    setError("");
    const fetchData = async () => {
      try {
        //Fetch response from bot
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": rapidApiKey,
            "X-RapidAPI-Host": "lemurbot.p.rapidapi.com",
          },
          body: JSON.stringify({
            bot: "dilly",
            client: user_metadata.clientChatSlug,
            message: userMessage,
          }),
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch: " + response.status + response.statusText,
          );
        }
        const data = (await response.json()) as ConversationResponse;

        if (!data) throw new Error("data empty");

        const conv = {
          input: data.data.conversation.input,
          output: data.data.conversation.output,
          bot_id: data.data.bot.id,
          client_slug: data.data.client.slug,
        };
        //Add response to database. Error thrown here is not caught in the catch block.
        addConversation(conv);
      } catch (error) {
        if (error instanceof Error) setError("Error " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [
    userMessage,
    setError,
    setIsLoading,
    user_metadata.clientChatSlug,
    addConversation,
  ]);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversations]);
  
  return (
    <div
      ref={chatContainerRef}
      className={`${
        isOpen ? `max-h-52 overflow-auto p-2` : "max-h-0 overflow-hidden"
      } scrollbar h-52 rounded-b bg-gray-100 transition-all duration-300 ${
        error && "bg-red-500"
      }`}
    >
      {isPending ? (
        <p className="mt-2 text-center">Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : conversations && conversations?.length > 0 ? (
        conversations.map((conversation) => (
          <Fragment key={conversation.id}>
            <div className="flex flex-row-reverse items-center gap-2 p-1 pl-6">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user_metadata.avatar || conversation.clients.image}
                alt=""
              />
              <p>{conversation.input}</p>
            </div>
            <div className="flex items-center gap-2 p-1 pr-6">
              <img className="h-8 w-8" src={conversation.bot.image} alt="" />
              <p>{conversation.output}</p>
            </div>
          </Fragment>
        ))
      ) : (
        <p>Send a message to start a new conversation</p>
      )}
    </div>
  );
};

export default ChatBody;
