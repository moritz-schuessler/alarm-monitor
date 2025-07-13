"use client";

import { useRouter } from "next/navigation";
import SelectIncident from "./select-incident";
import useMe from "@/hooks/use-me";

const Home = () => {
  const router = useRouter();
  const { data: firetruck, status } = useMe();

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  if (firetruck!.activeIncident !== null) {
    router.push("/");
  }

  return <SelectIncident />;
};

export default Home;
