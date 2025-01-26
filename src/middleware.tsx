import { type NextRequest } from "next/server";

import { updateSession } from "@lib/supabase/middleware";

export const middleware = async (request: NextRequest) => {
  return await updateSession(request);
};

export const config = {
  matcher: [
    "/account/:path*", // Match all requests starting with /admin
  ],
};
