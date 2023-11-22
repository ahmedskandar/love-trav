import { User } from "../lib/types";
import supabase from "./supabase";

export const getUsers = async () => {

  const { data: user, error } = await supabase.from("users").select("*")

  if(error) {
    throw new Error("Users could not be loaded")
  }
  const data = user as User[];
  
  return data
};
