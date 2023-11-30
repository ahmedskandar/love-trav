import supabase, { supabaseUrl } from "./supabase";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

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
  username: string;
  email: string;
  password: string;
  nationality: string;
  image: File;
}) => {
  const imageName = `${Math.random()}-${image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
  // 1. Create user
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //Add optional data into the newly created user
      data: {
        username,
        nationality,
        avatar: imagePath,
      },
    },
  });

  // 2. Upload image
  // Upload file using standard upload
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, image);
  if (storageError)
    throw new Error("Image could not be uploaded, please try again");

  if (error) throw new Error(error.message);

};
