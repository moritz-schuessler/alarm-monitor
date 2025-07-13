import { Firetrucks, Stations } from "@/data/schema";

interface Props {
  stations: Stations[];
}

const AssignedUnits = ({ stations }: Props) => {
  return (
    <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-1">
      <div className="flex flex-col gap-4 p-4">
        {stations.map((station) => {
          return (
            <div key={station.id} className="flex flex-col">
              <div>{station.name}</div>
              {station.firetrucks.map((firetruck: Firetrucks) => {
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
