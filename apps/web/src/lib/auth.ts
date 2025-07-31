import "server-only";

import { cookies } from "next/headers";

const getSession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  return cookie;
};

export { getSession };
