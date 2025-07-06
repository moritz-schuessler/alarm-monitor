"use client";

import ShortInformation from "./short-information";
import useIncident from "@/hooks/use-incident";

const IncidentPage = () => {
  const { data: incident, status } = useIncident();

  if (status === "pending") {
    return "...Loading";
  }

  return (
    <div className="grid grid-cols-3 grid-rows-[auto_1fr] flex-col size-full gap-8">
      <ShortInformation incident={incident!} />
      <div className="grid grid-cols-subgrid col-span-3">
        <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-2">
          Mannschaft...
        </div>
        <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-1">
          Einheiten...
        </div>
      </div>
    </div>
  );
};

export default IncidentPage;
