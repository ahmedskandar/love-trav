import { createClient } from "@supabase/supabase-js";
import { apiKey } from "../data/constants";

export const supabaseUrl = "https://dzypyxpbrupmlvqsxdmw.supabase.co";
const supabaseKey = apiKey; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
