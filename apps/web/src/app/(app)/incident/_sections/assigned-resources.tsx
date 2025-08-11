"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useGetFiretruck from "@/hooks/use-get-firetruck";
import useIncident from "@/hooks/use-get-incident";
import formatCrew from "@/utils/formatCrew";
import { FiretruckEntity } from "@alarm-monitor/shared/src";

const AssignedResources = () => {
  const { data, isLoading } = useIncident();

  if (isLoading) {
    return (
      <div className="flex flex-col p-4 ring ring-border">
        <Skeleton className="h-[20px] w-1/3 my-1 rounded-sm" />
        <div className="flex justify-between">
          <Skeleton className="h-[20px] w-2/3 my-1 rounded-sm" />
          <Skeleton className="h-[20px] w-1/12 my-1 rounded-sm" />
        </div>
      </div>
    );
  }

  const stations = data?.stations;

  return (
    <div className="flex flex-col gap-0.25">
      {stations &&
        stations.map((station) => {
          return (
            <div
              key={station.id}
              className="flex flex-col p-4 ring ring-border"
            >
              <div className="text-muted-foreground">{station.name}</div>
              {station.firetrucks.map((firetruck) => {
                return <Firetruck key={firetruck.id} firetruck={firetruck} />;
              })}
            </div>
          );
        })}
    </div>
  );
};

const Firetruck = ({ firetruck }: { firetruck: FiretruckEntity }) => {
  const { data, isLoading } = useGetFiretruck(firetruck.id);

  if (isLoading) {
    return (
      <div className="flex justify-between">
        <div>{firetruck.radioIdentification}</div>
        <Skeleton className="h-[20px] w-1/12 my-1 rounded-sm" />
      </div>
    );
  }

  const crew = data?.crew;

  return (
    <div className="flex justify-between">
      <div>{firetruck.radioIdentification}</div>
      {crew && <div className="flex items-center">{formatCrew(crew)}</div>}
    </div>
  );
};

export default AssignedResources;
