import IncidentGuard from "./_components/incident-guard";
import IncidentInformations from "./_sections/incident-informations";
import AssignedResources from "./_sections/assigned-resources";
import CrewOverview from "./_sections/crew-overview";
import Section from "@/components/ui/section";

const Page = () => {
  return (
    <IncidentGuard>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] size-full gap-4">
        <Section className="col-span-3">
          <IncidentInformations />
        </Section>
        <div className="grid grid-cols-subgrid col-span-3">
          <Section className="col-span-2">
            <CrewOverview />
          </Section>
          <Section className="col-span-1">
            <AssignedResources />
          </Section>
        </div>
      </div>
    </IncidentGuard>
  );
};

export default Page;
