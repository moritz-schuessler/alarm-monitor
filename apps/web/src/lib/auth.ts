import "server-only";

import { cookies } from "next/headers";
import { createSession, decrypt, deleteSession } from "./session";
import { getFiretruckByRadioIdentification } from "@/data/firetrucks/getFiretruck";

const auth = async () => {
  const cookie = (await cookies()).get("session")?.value;
  return await decrypt(cookie);
};

const signIn = async (radioIdentification: string) => {
  const firetruck =
    await getFiretruckByRadioIdentification(radioIdentification);

  if (!firetruck) {
    return {
      message: "An error occurred while authenticating.",
    };
  }

  await createSession(firetruck);
};

const signOut = async () => {
  await deleteSession();
};

export { auth, signIn, signOut };
