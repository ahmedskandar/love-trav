import { FormData, User } from "../lib/types";
import supabase, { supabaseUrl } from "./supabase";

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

export const createUser = async (newUser: FormData) => {
  const imageName = `${Math.random()}-${newUser.image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
  // 1. Create user
  const { data, error } = await supabase
    .from("users")
    .insert([{ ...newUser, image: imagePath }]);

  if (error) {
    throw new Error("User could not be added, please try again");
  }

  // 2. Upload image
  // Upload file using standard upload
  // eslint-disable-next-line
  const { error: storageError } = await supabase.storage.from("avatars").upload(imageName, newUser.image);
  if (storageError) {
    // Delete cabin
    await supabase.from("users").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded, please try again");
  } else {
    // Handle success
  }
};
