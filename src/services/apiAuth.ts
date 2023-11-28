import supabase from "./supabase";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

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
  nationality
}: {
  username: string;
  email: string;
  password: string;
  nationality: string
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //Add optional data into the newly created user
      data: {
        username,
        nationality,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};
