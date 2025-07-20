"use client";

import { Button } from "@/components/ui/button";
import { Incidents } from "@/data/shared/schema";
import { formatDate } from "@/lib/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  incident: Incidents;
}

const Incident = ({ incident }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (incidentId: string) => {
      const response = await fetch("/api/me/incident", {
        method: "POST",
        body: JSON.stringify({ incidentId: incidentId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["firetruck/me"] });
      queryClient.invalidateQueries({ queryKey: ["active-incident"] });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex group size-fit p-4 text-left"
      onClick={() => mutation.mutate(incident.id)}
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
