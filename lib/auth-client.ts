import { createAuthClient } from "better-auth/react";

const publicAuthBaseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(
  /\/+$/,
  "",
);

export const authClient = createAuthClient({
  ...(publicAuthBaseUrl ? { baseURL: publicAuthBaseUrl } : {}),
});
