import { rapidApiKey } from "../data/constants";
import { ChatClientSchema } from "../lib/schemas";

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

