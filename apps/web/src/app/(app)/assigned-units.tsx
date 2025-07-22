import { type FiretruckDetails } from "@/data/domains/firetrucks/firetruck.types";
import { type IncidentDetails } from "@/data/domains/incident/incident.types";
import { Firetrucks } from "@/data/shared/schema";
import useGetFiretruck from "@/hooks/use-get-firetruck";

interface Props {
  stations: IncidentDetails["stations"];
}

const AssignedUnits = ({ stations }: Props) => {
  return (
    <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-1">
      <div className="flex flex-col divide-border divide-y-1">
        {stations.map((station) => {
          return (
            <div key={station.id} className="flex flex-col p-4 gap-1">
              <div>{station.name}</div>
              {station.firetrucks.map((firetruck) => {
                return <Firetruck key={firetruck.id} firetruck={firetruck} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Firetruck = ({ firetruck }: { firetruck: Firetrucks }) => {
  const { data: firetruckDetails, isLoading } = useGetFiretruck(firetruck.id);

  if (isLoading) {
    return "...Loading";
  }

  const crewStats = crewStatsFormatter(firetruckDetails!.crew);

  return (
    <div className="flex justify-between">
      <div>{firetruck.radioIdentification}</div>
      <div className="flex gap-1 items-center">
        {crewStats && crewStats![0] + " / " + crewStats![1]}
      </div>
    </div>
  );
};

const crewStatsFormatter = (crew: NonNullable<FiretruckDetails>["crew"]) => {
  console.log(crew);
  if (!crew?.firefighters) {
    return [0, 0];
  }

  const hasLeadership = crew?.firefighters.some((firefighter) => {
    return firefighter.qualificationToFirefighter.some((qualifications) => {
      return qualifications.qualification.name === "Gruppenführer";
    });
  });

  if (hasLeadership) {
    return [1, crew!.firefighters.length - 1];
  }

  return [0, crew!.firefighters.length];
};

export default AssignedUnits;
