import { createClient } from "@supabase/supabase-js";
import { apiKey } from "../data/constants";

export const supabaseUrl = "https://dzypyxpbrupmlvqsxdmw.supabase.co";
const supabaseKey = apiKey; //! will tell TypeScript that process.env.SUPABASE_KEY is not null or undefined
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
