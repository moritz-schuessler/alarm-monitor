"use client";

import { Button } from "@/components/ui/button";
import useAddFiretruckToIncident from "@/hooks/use-add-firetruck-to-incident";
import useGetMe from "@/hooks/use-get-me";
import { formatDate } from "@/lib/date";
import { IncidentEntity } from "@alarm-monitor/shared/src";

interface Props {
  incident: IncidentEntity;
}

const Incident = ({ incident }: Props) => {
  const { data } = useGetMe();
  const mutation = useAddFiretruckToIncident();

  return (
    <Button
      variant="outline"
      className="flex group size-fit p-4 text-left"
      onClick={() =>
        mutation.mutate({
          firetruckId: data!.firetruck!.id!,
          incidentId: incident.id,
        })
      }
    >
      <div className="flex flex-col gap-2">
        <div className="text-lg">{incident.keyword}</div>
        <div className="text-muted-foreground text-base">
          <div>{formatDate(incident.alarmTime!)}</div>
          <div>{incident.adress}</div>
        </div>
      </div>
    </Button>
  );
};

export default Incident;
