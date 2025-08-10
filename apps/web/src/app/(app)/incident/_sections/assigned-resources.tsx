"use client";

import useGetFiretruck from "@/hooks/use-get-firetruck";
import useIncident from "@/hooks/use-get-incident";
import formatCrew from "@/utils/formatCrew";
import { FiretruckEntity } from "@alarm-monitor/shared/src";

const AssignedResources = () => {
  const { data } = useIncident();

  const stations = data?.stations;

  return (
    <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-1">
      <div className="flex flex-col divide-border divide-y-1">
        {stations &&
          stations.map((station) => {
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

const Firetruck = ({ firetruck }: { firetruck: FiretruckEntity }) => {
  const { data: firetruckDetails, isLoading } = useGetFiretruck(firetruck.id);

  if (isLoading) {
    return "...Loading";
  }

  return (
    <div className="flex justify-between">
      <div>{firetruck.radioIdentification}</div>
      <div className="flex gap-1 items-center">
        {formatCrew(firetruckDetails!.crew)}
      </div>
    </div>
  );
};

export default AssignedResources;
