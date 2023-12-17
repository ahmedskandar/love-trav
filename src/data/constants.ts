export const apiKey = import.meta.env.VITE_SUPABASE_API_KEY as string;
export const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY as string;

export const params = Object.fromEntries(
  new URLSearchParams(window.location.hash.substring(1)),
);
