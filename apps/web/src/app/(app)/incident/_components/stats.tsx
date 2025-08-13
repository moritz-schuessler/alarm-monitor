import { StatCard } from "@/components/ui/card/stat-card";
import useGetFiretruck from "@/hooks/use-get-firetruck";
import useSelectedFiretruck from "@/hooks/utils/use-selected-firetruck";
import { queryFirefighters } from "@/lib/firefighter-helper";

const Stats = () => {
  const { data: selectedFiretruck } = useSelectedFiretruck();
  const { data: firetruck } = useGetFiretruck(selectedFiretruck || "");

  const firefighters = firetruck ? firetruck?.crew.firefighters : [];

  const verbandsfuehrer = queryFirefighters(firefighters)
    .filterByActiveQualification("Verbandsführer")
    .toArray();

  const usedFirefighters = [...verbandsfuehrer];

  const zugfuehrer = queryFirefighters(firefighters)
    .filterByActiveQualification("Zugführer")
    .excludeFirefighters(usedFirefighters)
    .toArray();

  usedFirefighters.push(...zugfuehrer);

  const gruppenfuehrer = queryFirefighters(firefighters)
    .filterByActiveQualification("Gruppenführer")
    .excludeFirefighters(usedFirefighters)
    .toArray();

  usedFirefighters.push(...gruppenfuehrer);

  const fuehrungskraft = [...usedFirefighters];
  console.log(fuehrungskraft);

  const truppfuehrer = queryFirefighters(firefighters)
    .filterByActiveQualification("Truppfuehrer")
    .excludeFirefighters(usedFirefighters)
    .toArray();

  usedFirefighters.push(...truppfuehrer);

  const grundlehrgang = queryFirefighters(firefighters)
    .filterByActiveQualification("Grundlehrgang")
    .excludeFirefighters(usedFirefighters)
    .toArray();

  const agt = queryFirefighters(firefighters).filterByActiveQualification(
    "Atemschutzgeräteträger",
  );
  const tauglicheAgt = agt
    .filterByActiveQualification("G26.3")
    .filterByActiveQualification("Atemschutz/Unterweisung")
    .filterByActiveQualification("Atemschutz/Atemschutzstrecke")
    .filterByActiveQualification("Atemschutz/Einsatz/Übung")
    .toArray();
  const untauglicheAGT = agt.excludeFirefighters(tauglicheAgt).toArray();

  const maschinist = queryFirefighters(firefighters)
    .filterByActiveQualification("Maschinist")
    .toArray();

  const c = queryFirefighters(firefighters)
    .filterByActiveQualification("C")
    .toArray();
  const ce = queryFirefighters(firefighters)
    .filterByActiveQualification("CE")
    .toArray();
  const lkw = [...c, ...ce];

  return (
    <div className="flex flex-col h-full gap-0.25">
      <div className="p-4 bg-secondary ring ring-border">
        Einsatzrelevante Informationen
      </div>
      <div className="h-full grid grid-cols-3 bg-secondary gap-0.25 ">
        <div className="flex bg-background ring ring-border *:w-full">
          <StatCard
            description="Grundlehrgang"
            value={grundlehrgang.length}
            className="bg-background"
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          <StatCard
            description="Truppführer"
            value={truppfuehrer.length}
            className="bg-background"
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-1/2 gap-0.25">
          <StatCard
            description="Führungskraft"
            value={fuehrungskraft.length}
            thresholds={{ success: 1 }}
          />
          <div className="flex flex-col *:h-full gap-0.25">
            <StatCard
              description="Gruppenführer"
              value={gruppenfuehrer.length}
              thresholds={{ success: 1 }}
              valueForThreshold={fuehrungskraft.length}
            />
            <StatCard
              description="Zugführer"
              value={zugfuehrer.length}
              thresholds={{ success: 1 }}
              valueForThreshold={fuehrungskraft.length}
            />
            <StatCard
              description="Verbandsführer"
              value={verbandsfuehrer.length}
              thresholds={{ success: 1 }}
              valueForThreshold={fuehrungskraft.length}
            />
          </div>
        </div>
        <div className="flex bg-background ring ring-border *:w-full gap-0.25">
          <StatCard
            description="Taugliche AGT"
            value={tauglicheAgt.length}
            thresholds={{ success: 4, warning: 2 }}
          />
          <StatCard description="Taugliche AGT" value={untauglicheAGT.length} />
        </div>
        <div className="flex bg-background ring ring-border *:w-full gap-0.25">
          <StatCard
            description="Maschinist"
            value={maschinist.length}
            thresholds={{ success: 1 }}
          />
          <StatCard
            description="LKW-Führerschein"
            value={lkw.length}
            thresholds={{ success: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
