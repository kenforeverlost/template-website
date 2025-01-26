"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabase } from "@lib/supabase/client";
import { AuthUserProps, ProfileProps } from "@type/auth";

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

export const loginUser = async ({ email, password }: AuthUserProps) => {
  const response: {
    result: boolean;
    message: string;
    data: ProfileProps | undefined;
  } = {
    result: false,
    message: "",
    data: undefined,
  };

  try {
    const { data: loginData, error: loginDataError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (loginDataError) {
      throw loginDataError;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", loginData.user.id);

    if (profileError) {
      throw profileError;
    }

    response["result"] = true;
    response["message"] = "Login successful!";
    response["data"] = profile ? profile[0] : undefined;
    //TODO: Redirector to account page
  } catch (error: unknown) {
    response["message"] =
      error instanceof Error && error?.message !== ""
        ? error.message
        : "Logging in is unavailable at this time. Check back later!";
  }

  return response;
};
