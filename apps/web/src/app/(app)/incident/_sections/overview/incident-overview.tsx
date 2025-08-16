import { StatCard } from "@/components/ui/card/stat-card";
import useIncident from "@/hooks/use-get-incident";
import { queryFirefighters } from "@/lib/firefighter-helper";
import SelectQualification from "../../_components/select-qualification";

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
    <div className="flex flex-col gap-0.25 ring ring-border h-full">
      <div className="text-xl p-4 ring ring-border font-extrabold">
        Einsatzstatistiken
      </div>
      <div className="flex flex-col h-full gap-0.25">
        <div className="flex flex-col h-3/5 ring ring-border gap-0.25">
          <div className="text-base p-4 ring ring-border bg-secondary font-semibold h-min">
            Einsatzrelevante Informationen
          </div>
          <div className="grid grid-cols-3 h-full bg-secondary gap-0.25">
            <StatCard
              description="Einsatzkräfte"
              value={!isPending ? firefighters.length : undefined}
              className="bg-background"
            />
            <StatCard
              description="Freie Führungskräfte"
              value={!isPending ? totalLeaders : undefined}
              className="bg-background"
            />
            <StatCard
              description="Fachgebiet Presse"
              value={!isPending ? presse.length : undefined}
              className="bg-background"
            />
            <StatCard
              description="Taugliche AGT"
              value={!isPending ? agt.length : undefined}
              className="bg-background"
            />
            <StatCard
              description="Fachgebiet Atemschutz"
              value={!isPending ? fgAgt.length : undefined}
              className="bg-background"
            />
          </div>
        </div>
        <div className="flex flex-col h-2/5 ring ring-border gap-0.25">
          <div className="text-base p-4 ring ring-border bg-secondary font-semibold h-min">
            Zusätzliche Informationen
          </div>
          <div className="grid grid-cols-3 h-full gap-0.25">
            <SelectQualification />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentOverview;
