"use client";

import { redirect } from "next/navigation";
import SelectIncident from "./select-incident";
import useMe from "@/hooks/use-me";

const Home = () => {
  const { data: firetruck, status } = useMe();

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  if (firetruck!.activeIncident !== null) {
    redirect("/");
  }

  return <SelectIncident />;
};

export default Home;
