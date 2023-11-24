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
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    throw new Error("Account could not be deleted, please try again");
  }

};

export const createUser = async (newUser: {username: string, email: string, password: string, nationality: string}) => {
  const { error } = await supabase
    .from("users")
    .insert([newUser])

  if (error) {
    throw new Error("User could not be deleted, please try again");
  }

};
