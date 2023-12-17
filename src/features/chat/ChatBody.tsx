import { Fragment, useEffect, useRef, useState } from "react";
import { ChatBodyProps, ConversationResponse, User } from "../../lib/types";
import { useUser } from "../../hooks/useUser";
import supabase from "../../services/supabase";
import { rapidApiKey } from "../../data/constants";
import { useAddConversation } from "./useAddConversation";

const ChatBody = ({
  setError,
  setIsLoading,
  userMessages,
  isOpen,
  setBotAvatar
}: ChatBodyProps) => {
  const {
    user: { user_metadata },
  } = useUser() as { user: User };
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<
    {
      id: number;
      input: string;
      output: string;
      clients: { image: string };
      bot: { image: string };
    }[]
  >([]);

  const { addConversation } = useAddConversation();

  const url = "https://lemurbot.p.rapidapi.com/chat";

  useEffect(() => {
    if (userMessages.length === 0) return;
    setIsLoading(true);
    setError("");
    const fetchData = async () => {
      try {
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
            message: userMessages[userMessages.length - 1],
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
        addConversation(conv);
      } catch (error) {
        if (error instanceof Error) setError("Error " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [userMessages, setError, setIsLoading, user_metadata.clientChatSlug, addConversation]);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchConversation = async () => {
      const { data: conversations, error } = (await supabase
        .from("conversations")
        .select("id,input,output,clients(image),bot(image)")
        .eq("client_slug", user_metadata.clientChatSlug)) as unknown as {
        data: {
          id: number;
          input: string;
          output: string;
          clients: { image: string };
          bot: { image: string };
        }[];
        error: Error;
      };

      if (error) setError("Error loading conversations: " + error.message);
      //Use the image of the bot you chat with last
      setBotAvatar(conversations[conversations.length-1].bot.image)
      setMessages(conversations);
    };
    void fetchConversation();
  }, [setError, user_metadata.clientChatSlug, setBotAvatar]);

  return (
    <div
      ref={chatContainerRef}
      className={`${
        isOpen ? `max-h-52 overflow-auto p-2` : "max-h-0 overflow-hidden"
      } scrollbar h-52 rounded-b bg-gray-100 transition-all duration-300`}
    >
      {messages.map((message) => (
        <Fragment key={message.id}>
          <div className="flex flex-row-reverse items-center gap-2 p-1 pl-6">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={user_metadata.avatar || message.clients.image}
              alt=""
            />
            <p>{message.input}</p>
          </div>
          <div className="flex items-center gap-2 p-1 pr-6">
            <img className="h-8 w-8" src={message.bot.image} alt="" />
            <p>{message.output}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ChatBody;
