import supabase from "./supabase";

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if(error) {
    throw new Error("Users could not be loaded")
  }
  //eslint-disable-next-line
  return data
};
