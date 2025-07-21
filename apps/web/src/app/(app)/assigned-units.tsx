import { IncidentDetails } from "@/data/domains/incident/incident.types";

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
                return (
                  <div key={firetruck.id}>{firetruck.radioIdentification}</div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignedUnits;
