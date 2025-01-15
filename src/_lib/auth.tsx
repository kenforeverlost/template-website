import { supabase } from "@lib/supabase";
import { AuthUserProps } from "@type/auth";

export const createUser = async ({ email, password }: AuthUserProps) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  console.log(data);
  console.log(error);
};

export const validateLogin = async ({ email, password }: AuthUserProps) => {
  let result = false;
  let message = "";
  let userData = undefined;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    message = "Login successful";
    result = true;
    userData = data.user;
  } catch (error: unknown) {
    message =
      error instanceof Error && error?.message
        ? error?.message
        : "An error occurred during login";
  }

  return { result: result, message: message, userData: userData };
};
