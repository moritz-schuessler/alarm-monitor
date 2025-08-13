"use client";

import useView from "@/hooks/utils/use-view";
import CrewOverview from "./crew-overview";
import IncidentOverview from "./incident-overview";

const Overview = () => {
  const { data: view } = useView();

  return (
    <>
      {view === "firetruck" && <CrewOverview />}
      {view === "incident" && <IncidentOverview />}
    </>
  );
};

export default Overview;
