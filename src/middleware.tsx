import type { NextRequest } from "next/server";
import { getSessionData } from "@lib/server";

export const middleware = async (request: NextRequest) => {
  const sessionData = await getSessionData();
  const path = request.nextUrl.pathname;
  const isLoggedIn = sessionData && sessionData?.loggedIn;

  console.log({
    middleware: {
      sessionData: sessionData,
      path: path,
      isLoggedIn: isLoggedIn
    }
  });
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" }
  ]
};
