import { rapidApiReverseGeocodingKey } from "../lib/constants";
import { TEditForm, TPlaceSchema, TTravelFormSchema } from "../lib/types";
import { supabase } from "./supabase";
import { placeSchema } from "../lib/schemas";

export const getTravels = async (id: string) => {
  const { data: travels, error } = await supabase
    .from("travels")
    .select("*")
    .eq("user_id", id);

  if (error) throw new Error("Error: " + error.message);

  return travels as (TTravelFormSchema & {
    id: number;
    created_at: Date;
    country_code: string;
  })[];
};

export const deleteTravel = async (id: number) => {
  const { error } = await supabase.from("travels").delete().eq("id", id);

  if (error) throw new Error("Error: " + error.message);
};

export const addTravel = async (
  travel: TTravelFormSchema & {
    user_id: string;
    country_code: string;
  },
) => {
  const { error } = await supabase.from("travels").insert([travel]);

  if (error) throw new Error("Error: " + error.message);
};

export const editTravel = async ({ id, ...travel }: TEditForm) => {
  const { error } = await supabase.from("travels").update(travel).eq("id", id);

  if (error) throw new Error("Error: " + error.message);
};

export const getPlaceByPosition = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  const apiUrl = "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse";
  // const params = new URLSearchParams({
  //   lat,
  //   lon,
  //   "accept-language": "en",
  // });

  const headers = {
    "X-RapidAPI-Key": rapidApiReverseGeocodingKey,
    "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
  };
  const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lng}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) throw new Error("Error getting place");

  const place = (await response.json()) as TPlaceSchema;
  if (!place) throw new Error("No place found");

  const validatedPlace = placeSchema.safeParse(place);
  if (!validatedPlace.success)
    throw new Error(`Error getting place, please try selecting a valid place`);

  return validatedPlace.data;
};
