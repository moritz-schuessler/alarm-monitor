import "server-only";

import { cookies } from "next/headers";
import { createSession, decrypt, deleteSession } from "./session";
import firetruckService from "@/data/domains/firetrucks/firetruck.service";

const auth = async () => {
  const cookie = (await cookies()).get("session")?.value;
  return await decrypt(cookie);
};

const signIn = async (radioIdentification: string) => {
  const firetruck =
    await firetruckService.getFiretruckByRadioIdentification(
      radioIdentification,
    );

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
