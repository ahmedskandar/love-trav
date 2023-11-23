import { User } from "../lib/types";
import supabase from "./supabase";

export const getUsers = async () => {
  const { data: user, error } = await supabase.from("users").select("*");

  if (error) {
    throw new Error("Users could not be loaded");
  }
  const data = user as User[];

  return data;
};

export const deleteUser = async (id: number) => {
  const { data, error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    throw new Error("Account could not be deleted, please try again");
  }

  return data;
};
