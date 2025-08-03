"use client";

import { redirect } from "next/navigation";
import SelectIncident from "./select-incident";
import useGetMe from "@/hooks/use-get-me";

const Home = () => {
  const { data, status } = useGetMe();

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  console.log(data);

  if (data!.firetruck!.activeIncident !== null) {
    redirect("/");
  }

  return <SelectIncident />;
};

export default Home;
