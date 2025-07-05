"use client";

import { Button } from "@/components/ui/button";
import { Incidents } from "@/data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  incident: Incidents;
}

const Incident = ({ incident }: Props) => {
  const router = useRouter();
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
      console.log("invalidate...");
      queryClient.invalidateQueries({ queryKey: ["firetruck/me"] });
      router.push("/");
    },
  });

  const date = new Date(incident.alarmTime!).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
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
          <div>{date}</div>
          <div>{incident.adress}</div>
        </div>
      </div>
    </Button>
  );
};

export default Incident;
