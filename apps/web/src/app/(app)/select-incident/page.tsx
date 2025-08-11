"use client";

import useGetMe from "@/hooks/use-get-me";
import useGetStationIncidents from "@/hooks/use-get-station-incidents";
import { Button } from "@/components/ui/button";
import useAddFiretruckToIncident from "@/hooks/use-add-firetruck-to-incident";
import { formatDate } from "@/lib/date";
import { Skeleton } from "@/components/ui/skeleton";

const SelectIncidentPage = () => {
  const { data: me, isLoading: meIsLoading } = useGetMe();
  const { data: incidents, isLoading } = useGetStationIncidents(
    me?.station?.id,
  );

  const mutation = useAddFiretruckToIncident();

  if (meIsLoading || isLoading) {
    return (
      <div className="flex gap-4 size-full justify-center items-center">
        <Button
          variant="outline"
          className="flex group size-fit p-4 text-left w-1/8"
          disabled
        >
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="h-[20px] w-1/2 m-1 rounded-sm" />
            <div className="text-muted-foreground text-base">
              <Skeleton className="h-[20px] w-full m-1 rounded-sm" />
              <Skeleton className="h-[20px] w-full m-1 rounded-sm" />
            </div>
          </div>
        </Button>
      </div>
    );
  }

  if (incidents!.length) {
    return (
      <div className="flex gap-4 size-full justify-center items-center">
        {incidents &&
          incidents!.map((incident) => {
            return (
              <Button
                key={incident.id}
                variant="outline"
                className="flex group size-fit p-4 text-left w-1/8 text-lg"
                onClick={() =>
                  mutation.mutate({
                    firetruckId: me!.firetruck!.id!,
                    incidentId: incident.id,
                  })
                }
              >
                <div className="flex flex-col gap-2 w-full">
                  <div>{incident.keyword}</div>
                  <div className="text-muted-foreground text-base">
                    <div>{formatDate(incident.alarmTime!)}</div>
                    <div>{incident.adress}</div>
                  </div>
                </div>
              </Button>
            );
          })}
      </div>
    );
  }

  return <>Deine Feuerwehr hat aktuell kein Einsatz</>;
};

export default SelectIncidentPage;
