import { Information } from "@/components/ui/information";
import {
  FirefighterDetails,
  FiretruckDetails,
} from "@/data/domains/firetrucks/firetruck.types";

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
          <Information
            text={grundlehrgang ? grundlehrgang?.length.toString() : "0"}
            description="Grundausbildung"
          />
          <Information
            text={truppfuehrer ? truppfuehrer?.length.toString() : "0"}
            description="Truppführer"
          />
        </div>
        <div className="flex  bg-background ring ring-border *:w-full">
          <Information
            text={gruppenfuehrer ? gruppenfuehrer?.length.toString() : "0"}
            description="Gruppenführer"
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          <Information
            text={zugfuehrer ? zugfuehrer?.length.toString() : "0"}
            description="Zugführer"
          />
          <Information
            text={verbandsfuehrer ? verbandsfuehrer?.length.toString() : "0"}
            description="Verbandsführer"
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          <Information
            text={agt ? agt?.length.toString() : "0"}
            description="AGT"
          />
        </div>
        <div className="flex bg-background ring ring-border *:w-full">
          <Information
            text={maschinist ? maschinist?.length.toString() : "0"}
            description="Maschinisten"
          />
          <Information
            text={lkw ? lkw?.length.toString() : "0"}
            description="LKW-Füherschein"
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
