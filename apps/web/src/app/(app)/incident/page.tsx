"use client";

import IncidentGuard from "./_components/incident-guard";
import IncidentInformations from "./_sections/incident-informations";
import AssignedResources from "./_sections/assigned-resources";
import CrewOverview from "./_sections/crew-overview";

const Page = () => {
  return (
    <IncidentGuard>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] flex-col size-full gap-8">
        <IncidentInformations />
        <div className="grid grid-cols-subgrid col-span-3">
          <CrewOverview />
          <AssignedResources />
        </div>
      </div>
    </IncidentGuard>
  );
};

export default Page;
