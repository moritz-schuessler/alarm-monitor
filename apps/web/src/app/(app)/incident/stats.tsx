import { StatCard } from "@/components/ui/card/stat-card";
import {
  FirefighterDetails,
  FiretruckDetails,
} from "@alarm-monitor/shared/src";

interface Props {
  firetruck: FiretruckDetails;
}

const Stats = ({ firetruck }: Props) => {
  const firefighters = firetruck?.crew?.firefighters;

  const used: FirefighterDetails[] = [];

  const verbandsfuehrer = filterFirefighter(firefighters!, "Verbandsführer");

  used.push(...verbandsfuehrer);

  const zugfuehrer = filterFirefighter(firefighters!, "Zugführer").filter(
    (firefighter) => !used.includes(firefighter),
  );

  used.push(...zugfuehrer);

  const gruppenfuehrer = filterFirefighter(
    firefighters!,
    "Gruppenführer",
  ).filter((firefighter) => !used.includes(firefighter));

  used.push(...gruppenfuehrer);

  const fuehrungskraft = [...verbandsfuehrer, ...zugfuehrer, ...gruppenfuehrer];

  const truppfuehrer = filterFirefighter(firefighters!, "Truppführer").filter(
    (firefighter) => !used.includes(firefighter),
  );

  used.push(...truppfuehrer);

  const grundlehrgang = filterFirefighter(
    firefighters!,
    "Grundlehrgang",
  ).filter((firefighter) => !used.includes(firefighter));

  const agt = filterFirefighter(firefighters!, "Atemschutzgeräteträger");
  const maschinist = filterFirefighter(firefighters!, "Maschinist");
  const lkw = filterFirefighter(firefighters!, "LKW/C");

  return (
    <div className="flex flex-col h-full gap-0.25">
      <div className="p-4 bg-secondary ring ring-border">
        Einsatzrelevante Informationen
      </div>
      <div className="h-full grid grid-cols-3 bg-secondary gap-0.25">
        <div className="flex bg-background ring ring-border *:w-full">
          <StatCard
            description="Grundausbildung"
            value={grundlehrgang.length}
            thresholds={{ success: 4 }}
            bordered
          />
          <StatCard
            description="Truppführer"
            value={truppfuehrer.length}
            thresholds={{ success: 4 }}
            bordered
          >
            {truppfuehrer?.length.toString()}
          </StatCard>
        </div>
        <div className="flex  bg-background ring ring-border *:w-full">
          <StatCard
            description="Gruppenführer"
            value={gruppenfuehrer?.length}
            thresholds={{
              success: 1,
              warning: 1,
            }}
            valueForThreshold={fuehrungskraft.length}
            bordered
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          <StatCard
            description="Zugführer"
            value={zugfuehrer?.length}
            thresholds={{ success: 1 }}
            valueForThreshold={fuehrungskraft.length}
            bordered
          />
          <StatCard
            description="Verbandsführer"
            value={verbandsfuehrer?.length}
            thresholds={{ success: 1 }}
            valueForThreshold={fuehrungskraft.length}
            bordered
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          <StatCard
            description="AGT"
            value={agt.length}
            thresholds={{ success: 4, warning: 2 }}
            bordered
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          <StatCard
            description="Maschinisten"
            value={maschinist.length}
            thresholds={{ success: 1 }}
            bordered
          />
          <StatCard
            description="LKW-Füherschein"
            value={lkw.length}
            thresholds={{ success: 1 }}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;

const filterFirefighter = (
  firefighters: FirefighterDetails[],
  qualification: string,
) => {
  return firefighters?.filter((firefighter) => {
    return firefighter.qualificationToFirefighter.some((qualifications) => {
      return qualifications.qualification.name === qualification;
    });
  });
};
