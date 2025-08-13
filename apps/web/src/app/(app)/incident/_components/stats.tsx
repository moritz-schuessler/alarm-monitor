import { StatCard } from "@/components/ui/card/stat-card";
import useGetFiretruck from "@/hooks/use-get-firetruck";
import useSelectedFiretruck from "@/hooks/utils/use-selected-firetruck";
import { FirefighterDetails } from "@alarm-monitor/shared/src";
import { ReactNode } from "react";

type StatCardKeys =
  | "gruppenfuehrer"
  | "zugfuehrer"
  | "verbandsfuehrer"
  | "grundlehrgang"
  | "truppfuehrer"
  | "agt"
  | "maschinist"
  | "lkw";

type StatCardsMap = Record<StatCardKeys, ReactNode>;

const Stats = () => {
  const { data: selectedFiretruck } = useSelectedFiretruck();
  const { data: firetruck } = useGetFiretruck(selectedFiretruck || "");

  const firefighters = firetruck?.crew?.firefighters;

  const statCards = firefighters && getStatCards(firefighters);

  return (
    <div className="flex flex-col h-full gap-0.25">
      <div className="p-4 bg-secondary ring ring-border">
        Einsatzrelevante Informationen
      </div>
      <div className="h-full grid grid-cols-3 bg-secondary gap-0.25">
        <div className="flex bg-background ring ring-border *:w-full">
          {statCards?.grundlehrgang}
          {statCards?.truppfuehrer}
        </div>
        <div className="flex  bg-background ring ring-border *:w-full">
          {statCards?.gruppenfuehrer}
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          {statCards?.zugfuehrer}
          {statCards?.verbandsfuehrer}
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          {statCards?.agt}
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          {statCards?.maschinist}
          {statCards?.lkw}
        </div>
      </div>
    </div>
  );
};

const getStatCards = (firefighters: FirefighterDetails[]) => {
  const used: FirefighterDetails[] = [];
  const statCards: Partial<StatCardsMap> = {};

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

  statCards.gruppenfuehrer = (
    <StatCard
      description="Gruppenführer"
      value={gruppenfuehrer?.length}
      thresholds={{ success: 1 }}
      valueForThreshold={fuehrungskraft.length}
      bordered
    />
  );

  statCards.zugfuehrer = (
    <StatCard
      description="Zugführer"
      value={zugfuehrer?.length}
      thresholds={{ success: 1 }}
      valueForThreshold={fuehrungskraft.length}
      bordered
    />
  );

  statCards.verbandsfuehrer = (
    <StatCard
      description="Verbandsführer"
      value={verbandsfuehrer?.length}
      thresholds={{ success: 1 }}
      valueForThreshold={fuehrungskraft.length}
      bordered
    />
  );

  statCards.grundlehrgang = (
    <StatCard
      description="Grundausbildung"
      value={grundlehrgang.length}
      thresholds={{ success: 4 }}
      bordered
    />
  );

  statCards.truppfuehrer = (
    <StatCard
      description="Truppführer"
      value={truppfuehrer.length}
      thresholds={{ success: 4 }}
      bordered
    />
  );

  statCards.agt = (
    <StatCard
      description="AGT"
      value={agt.length}
      thresholds={{ success: 4, warning: 2 }}
      bordered
    />
  );

  statCards.maschinist = (
    <StatCard
      description="Maschinisten"
      value={maschinist.length}
      thresholds={{ success: 1 }}
      bordered
    />
  );

  statCards.lkw = (
    <StatCard
      description="LKW-Füherschein"
      value={lkw.length}
      thresholds={{ success: 1 }}
      bordered
    />
  );

  return statCards;
};

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

export default Stats;
