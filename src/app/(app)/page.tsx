"use client";

import useSession from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import SelectIncident from "./select-incident";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  if (session!.firetruck.activeIncident !== null) {
    router.push("/incident");
  }

  return <SelectIncident />;
};

export default Home;
