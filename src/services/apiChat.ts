import { ConversationInput, ConversationParams } from "../lib/types";
import { supabase } from "./supabase";
import { rapidApiKey, CHAT_URL } from "../lib/constants";
import { ConversationResponseSchema } from "../lib/schemas";
import { TConversationResponseSchema } from "../lib/types";

export const addConversation = async (conv: ConversationInput) => {
  const { error } = await supabase.from("conversations").insert([conv]);
  if (error) throw new Error("Failed to add conversation");
};

export const fetchConversation = async ({
  clientChatSlug,
}: ConversationParams) => {
  const { data: conversations, error } = await supabase
    .from("conversations")
    .select("id,input,output,clients(image),bot(image, name)")
    .eq("client_slug", clientChatSlug);
  if (error) throw new Error(error.message);

  return conversations as unknown as {
    id: number;
    input: string;
    output: string;
    clients: { image: string };
    bot: { image: string; name: string };
  }[];
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
