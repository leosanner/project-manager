import { cache } from "react";
import { auth } from "./index";
import { headers } from "next/headers";

export const getSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};
