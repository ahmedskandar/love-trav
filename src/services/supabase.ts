import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dzypyxpbrupmlvqsxdmw.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY!; //! will tell TypeScript that process.env.SUPABASE_KEY is not null or undefined
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
