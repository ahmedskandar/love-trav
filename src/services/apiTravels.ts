import { supabase } from "./supabase";

export const getTravels = async (id: string) => {
  const { data: travels, error } = await supabase
    .from("travels")
    .select("*")
    .eq("user_id", id);

  if (error) throw new Error("Error: " + error.message);

  return travels as {
    id: number;
    created_at: Date;
    place: string;
    notes: string;
    longitude: number;
    latitude: number;
  }[];
};

export const deleteTravel = async (id: number) => {
  const { error } = await supabase
    .from("travels")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Error: " + error.message);
};
