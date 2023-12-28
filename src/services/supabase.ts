import { createClient } from "@supabase/supabase-js";
import { supabaseKey } from "../data/constants";

export const supabaseUrl = "https://dzypyxpbrupmlvqsxdmw.supabase.co";
export const supabase = createClient(supabaseUrl, supabaseKey);

