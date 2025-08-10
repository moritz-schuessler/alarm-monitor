"use client";

import ShortInformation from "./short-information";
import CrewOverview from "./crew-overview";
import AssignedUnits from "./assigned-units";

import IncidentGuard from "./_components/incident-guard";

const Page = () => {
  return (
    <IncidentGuard>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] flex-col size-full gap-8">
        <ShortInformation />
        <div className="grid grid-cols-subgrid col-span-3">
          <CrewOverview />
          <AssignedUnits />
        </div>
      </div>
    </IncidentGuard>
  );
};

export default Page;
