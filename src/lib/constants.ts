import { parsedEnv } from "./schemas";

export const supabaseKey = parsedEnv.VITE_SUPABASE_API_KEY;
export const rapidApiKey = parsedEnv.VITE_RAPID_API_KEY;
export const rapidApiReverseGeocodingKey = parsedEnv.VITE_REVERSE_GEOCODING_RAPID_API_KEY

export const params = Object.fromEntries(
  new URLSearchParams(window.location.hash.substring(1)),
);

export const CHAT_URL = "https://lemurbot.p.rapidapi.com/chat";
