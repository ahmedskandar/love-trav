import { TLoginSchema, TResetSchema } from "../lib/types";
import { fetchClient } from "../lib/utils";
import supabase, { supabaseUrl } from "./supabase";

export const login = async ({ email, password }: TLoginSchema) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  //If user is new, create a new chat client for him
  if (!data?.user?.user_metadata?.clientChatSlug) {
    const clientData = (await fetchClient())!; //If fetchClient throws an error, code execution will stop and the error will be propagated to react query

    //Add the client details record in its table
    const { error } = await supabase.from("clients").insert([clientData.data]);

    if (error) throw new Error("Error adding client record: " + error.message);

    //Update user meta data to add the client slug
    const { error: updateError } = await supabase.auth.updateUser({
      data: { clientChatSlug: clientData.data.slug },
    });

    if (updateError)
      throw new Error("Error creating a chat client: " + updateError.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null; //If no current user

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const signup = async ({
  username,
  email,
  password,
  nationality,
  image,
}: {
  nationality: string;
  image: File;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}) => {
  const imageName = `${Math.random()}-${image?.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  // 1. Create user
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //Add optional data into the newly created user
      data: {
        username,
        nationality,
        avatar: image.name !== undefined ? imagePath : "",
      },
    },
  });

  if (data?.user?.identities?.length === 0)
    throw new Error("Account already registered");
  if (error) throw new Error(error.message);

  // 2. Upload image
  // Upload file using standard upload
  if (image.name === undefined) return;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, image);
  if (storageError)
    throw new Error("Image could not be uploaded, please try again");
};

export const reset = async ({ email }: TResetSchema) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
};

export const update = async ({ password }: { password: string }) => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) throw new Error(error.message);
};
