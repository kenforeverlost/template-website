"use server";

import { supabase } from "@lib/supabase";
import { AuthUserProps } from "@type/auth";

export const createUser = async ({ email, password }: AuthUserProps) => {
  const response: {
    result: boolean;
    message: string;
  } = {
    result: false,
    message: "",
  };

  try {
    const { data: allowedEmails, error: allowedEmailsError } = await supabase
      .from("allowed_email")
      .select("*")
      .eq("email", email);

    if (allowedEmailsError) {
      throw allowedEmailsError;
    }

    if (!allowedEmails || allowedEmails.length === 0) {
      throw new Error("This email is not allowed. Please contact admin");
    }

    const { data: existingEmail, error: existingEmailError } =
      await supabase.rpc("get_user_id_by_email", {
        email: email,
      });

    if (existingEmailError) {
      throw existingEmailError;
    }

    if (existingEmail && existingEmail.length > 0) {
      throw new Error("This email already exists!");
    }

    const { data: signupData, error: signupDataError } =
      await supabase.auth.signUp({
        email: email,
        password: password,
      });

    if (signupDataError) {
      throw signupDataError;
    }

    response["result"] = true;
    response["message"] = "Account created!";
  } catch (error: unknown) {
    response["message"] =
      error instanceof Error && error?.message !== ""
        ? error.message
        : "Signing up is unavailable at this time. Check back later!";
  }

  return response;
};
