"use client";

import { useRouter } from "next/navigation";
import SelectIncident from "./select-incident";
import { Firetrucks } from "@/data/schema";
import { useQuery } from "@tanstack/react-query";

interface Response {
  firetruck: Firetrucks;
}

const Home = () => {
  const router = useRouter();
  const { data, status } = useQuery({
    queryKey: ["firetruck/me"],
    queryFn: async () => {
      const response = await fetch("/api/me");
      return (await response.json()) as Response;
    },
  });

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  if (data!.firetruck.activeIncident !== null) {
    router.push("/incident");
  }

  return <SelectIncident />;
};

export default Home;
