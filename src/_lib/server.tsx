"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setSessionData = async () => {
  const sessionData = JSON.stringify({ loggedIn: true });
  const cookieStore = await cookies();

  cookieStore.set("session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 5, // 5 hours
    path: "/"
  });
};

export const getSessionData = async () => {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get("session")?.value;

  return sessionData ? JSON.parse(sessionData) : null;
};

export const navigate = async (path: string) => {
  redirect(path);
};
