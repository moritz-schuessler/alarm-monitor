import { StatCard } from "@/components/ui/card/stat-card";
import useIncident from "@/hooks/use-get-incident";
import { FirefighterDetails } from "@alarm-monitor/shared/src";

const IncidentOverview = () => {
  const { data: incident } = useIncident();

  const firefighters = incident
    ? incident?.firetrucks.flatMap((truck) => truck.crew.firefighters)
    : [];

  const agt = firefighterQuery(firefighters)
    .filterByAnyQualification("Atemschutzgeräteträger")
    .filterByActiveQualification("G26.3")
    .filterByActiveQualification("Atemschutz/Unterweisung")
    .filterByActiveQualification("Atemschutz/Atemschutzstrecke")
    .filterByActiveQualification("Atemschutz/Einsatz/Übung")
    .toArray();

  const fgAgt = firefighterQuery(firefighters)
    .filterByQualification("Fachgebiet Atemschutz")
    .toArray();

  const presse = firefighterQuery(firefighters)
    .filterByQualification("Fachgebiet Presse")
    .toArray();

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
          description="Taugliche AGT"
          value={agt.length}
          className="bg-background"
        />
        <StatCard
          description="Fachgebiet Atemschutz"
          value={fgAgt.length}
          className="bg-background"
        />
        <StatCard
          description="Fachgebiet Presse"
          value={presse.length}
          className="bg-background"
        />
      </div>
    </div>
  );
};

function firefighterQuery(list: FirefighterDetails[]) {
  return {
    list,
    filterByQualification(
      name: string,
      status: "active" | "expired" | "all" = "active",
    ) {
      return firefighterQuery(
        list.filter((f) =>
          f.qualificationToFirefighter.some((q) => {
            const nameMatch = q.qualification.name === name;
            if (status === "all") return nameMatch;
            return nameMatch && q.status === status;
          }),
        ),
      );
    },
    filterByActiveQualification(name: string) {
      return this.filterByQualification(name, "active");
    },
    filterByExpiredQualification(name: string) {
      return this.filterByQualification(name, "expired");
    },
    filterByAnyQualification(name: string) {
      return this.filterByQualification(name, "all");
    },
    filterByFirefighters(allowed: FirefighterDetails[]) {
      const allowedIds = new Set(allowed.map((f) => f.id));
      return firefighterQuery(list.filter((f) => allowedIds.has(f.id)));
    },
    toArray() {
      return list;
    },
  };
}

export default IncidentOverview;
