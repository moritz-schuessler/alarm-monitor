import IncidentInformations from "./_sections/incident-informations";
import AssignedResources from "./_sections/assigned-resources";
import Section from "@/components/ui/section";
import Overview from "./_sections/overview";

const Page = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-[auto_1fr] size-full gap-4">
      <Section className="col-span-3">
        <IncidentInformations />
      </Section>
      <div className="grid grid-cols-subgrid col-span-3">
        <Section className="col-span-2">
          <Overview />
        </Section>
        <Section className="col-span-1">
          <AssignedResources />
        </Section>
      </div>
    </div>
  );
};

export default Page;
