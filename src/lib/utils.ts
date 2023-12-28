import { rapidApiKey, CHAT_URL } from "../data/constants";
import { ChatClientSchema, ConversationResponseSchema } from "../lib/schemas";
import { TConversationResponseSchema } from "../lib/types";

//Creates a new client for the chat bot
export const createClient = async () => {
  try {
    const response = await fetch("https://lemurbot.p.rapidapi.com/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "lemurbot.p.rapidapi.com",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error("Chat client could not be created");
    }
    const chatClient: unknown = await response.json();
    const validatedChatClient = ChatClientSchema.safeParse(chatClient);
    if (!validatedChatClient.success)
      throw new Error(validatedChatClient.error.message);
    return validatedChatClient.data;
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
  }
};

//Send message to bot
export const sendMessage = async ({
  input,
  clientChatSlug,
}: {
  input: string;
  clientChatSlug: string;
}) => {
  const response = await fetch(CHAT_URL, {
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

  const conversationResponse =
    (await response.json()) as TConversationResponseSchema;

  const validatedConversationResponse =
    ConversationResponseSchema.safeParse(conversationResponse);

  if (!validatedConversationResponse.success)
    return console.error(validatedConversationResponse.error);

  const conv = {
    input: validatedConversationResponse.data.data.conversation.input,
    output: validatedConversationResponse.data.data.conversation.output,
    bot_id: validatedConversationResponse.data.data.bot.id,
    client_slug: validatedConversationResponse.data.data.client.slug,
  };

  return conv;
};
