"use client";

import { Incidents } from "@/data/schema";
import { useQuery } from "@tanstack/react-query";
import ShortInformation from "./short-information";

interface Response {
  incident: Incidents;
}

const IncidentPage = () => {
  const { data, status } = useQuery({
    queryKey: ["active-incident"],
    queryFn: async () => {
      const response = await fetch("/api/me/incident");
      return (await response.json()) as Response;
    },
  });

  if (status === "pending") {
    return "...Loading";
  }

  return (
    <div className="flex flex-col justify-start items-center size-full">
      <ShortInformation incident={data!.incident} />
    </div>
  );
};

export default IncidentPage;
