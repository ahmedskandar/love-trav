import { rapidApiReverseGeocodingKey } from "../lib/constants";
import { TPlaceSchema, TTravelFormSchema } from "../lib/types";
import { supabase } from "./supabase";
import { placeSchema } from "../lib/schemas";
import { toast } from "sonner";

export const getTravels = async (id: string) => {
  const { data: travels, error } = await supabase
    .from("travels")
    .select("*")
    .eq("user_id", id);

  if (error) throw new Error("Error: " + error.message);

  return travels as (TTravelFormSchema & {id: number, created_at: Date, country_code: string})[]
};

export const deleteTravel = async (id: number) => {
  const { error } = await supabase.from("travels").delete().eq("id", id);

  if (error) throw new Error("Error: " + error.message);
};

export const addTravel = async (travel: {
  notes: string;
  longitude: number;
  latitude: number;
  user_id: string;
  country_code: string
}) => {
  const { error } = await supabase.from("travels").insert([travel]);

  if (error) throw new Error("Error: " + error.message);
};

//Handle loading and error state
export const getPlaceByPosition = async ({lat, lon}:{lat: string, lon: string}) => {
  const apiUrl = "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse";
  const params = new URLSearchParams({
    lat,
    lon,
    "accept-language": "en",
  });

  const headers = {
    "X-RapidAPI-Key": rapidApiReverseGeocodingKey,
    "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
  };

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error gettingplace by position: ${response.status}`);
    }

    const place = await response.json() as TPlaceSchema; 
    const validatedPlace = placeSchema.safeParse(place)
    if(!validatedPlace.success) throw new Error(`Error validating place: ${validatedPlace.error.toString()}`)
    return validatedPlace.data;
  } catch (error) {
    if(error instanceof Error) toast.error(`Error getting place, please try selecting a valid place`)
  }
};
