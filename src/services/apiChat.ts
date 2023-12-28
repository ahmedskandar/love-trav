import {
  ConversationInput,
  ConversationParams,
} from "../lib/types";
import {supabase} from "./supabase";

export const addConversation = async (conv: ConversationInput) => {
  const { error } = await supabase.from("conversations").insert([conv]);
  if (error) throw new Error(error.message);
};

export const fetchConversation = async ({
  clientChatSlug,
}: ConversationParams) => {
  const { data: conversations, error } = (await supabase
    .from("conversations")
    .select("id,input,output,clients(image),bot(image, name)")
    .eq("client_slug", clientChatSlug)) 
  if (error) throw new Error(error.message);

  return conversations as unknown as {
    id: number;
    input: string;
    output: string;
    clients: { image: string };
    bot: { image: string; name: string };
  }[];
};
