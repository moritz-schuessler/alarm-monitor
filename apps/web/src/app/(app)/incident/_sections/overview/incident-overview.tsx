import { StatCard } from "@/components/ui/card/stat-card";
import useIncident from "@/hooks/use-get-incident";
import { queryFirefighters } from "@/lib/firefighter-helper";

const IncidentOverview = () => {
  const { data: incident, isPending } = useIncident();

  const firefighters = incident
    ? incident?.firetrucks.flatMap((truck) => truck.crew.firefighters)
    : [];

  const agt = queryFirefighters(firefighters)
    .filterByAnyQualification("Atemschutzgeräteträger")
    .filterByActiveQualification("G26.3")
    .filterByActiveQualification("Atemschutz/Unterweisung")
    .filterByActiveQualification("Atemschutz/Atemschutzstrecke")
    .filterByActiveQualification("Atemschutz/Einsatz/Übung")
    .toArray();

  const fgAgt = queryFirefighters(firefighters)
    .filterByQualification("Fachgebiet Atemschutz")
    .toArray();

  const presse = queryFirefighters(firefighters)
    .filterByQualification("Fachgebiet Presse")
    .toArray();

  const fuehrungskraefteFiretruck = incident
    ? incident.firetrucks.map((firetruck) => {
        return queryFirefighters(firetruck.crew.firefighters)
          .filterByAnyQualification("Gruppenführer")
          .toArray();
      })
    : [];

  const totalLeaders = fuehrungskraefteFiretruck
    .flatMap((firetruck) => {
      if (firetruck.length) {
        return firetruck.length - 1;
      }
      return firetruck.length;
    })
    .reduce((sum, count) => sum + count, 0);

  return (
    <div className="grid grid-cols-3 gap-0.25 ring ring-border h-full auto-rows-[auto_1fr] ">
      <div className="grid grid-cols-subgrid col-span-3 gap-0.25">
        <div className="text-xl p-4 col-span-3 ring ring-border">
          Einsatzstatistiken
        </div>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 h-full bg-secondary">
        <StatCard
          description="Einsatzkräfte"
          value={firefighters.length}
          className="bg-background"
        />
        <StatCard
          description="Freie Führungskräfte"
          value={!isPending ? totalLeaders : undefined}
          className="bg-background"
        />
        <StatCard
          description="Fachgebiet Presse"
          value={presse.length}
          className="bg-background"
        />
        <StatCard
          description="Taugliche AGT"
          value={agt.length}
          className="bg-background"
        />
        <StatCard
          description="Fachgebiet Atemschutz"
          value={fgAgt.length}
          className="bg-background"
        />
      </div>
    </div>
  );
};

export default IncidentOverview;
