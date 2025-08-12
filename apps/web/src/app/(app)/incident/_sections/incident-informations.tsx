"use client";

import { formatDate } from "@/lib/date";
import { InfoCard } from "@/components/ui/card/info-card";
import useIncident from "@/hooks/use-get-incident";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";

const IncidentInformations = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "firetruck";

  const { data } = useIncident();

  const incident = data?.incident;

  return (
    <div className="grid grid-cols-[repeat(3,minmax(auto,1fr))] gap-0.25">
      <div className="grid col-span-3 grid-cols-subgrid gap-0.25">
        <h2 className="p-4 col-span-2 ring ring-border">
          Einsatzinformationen
        </h2>
        <div className="ring ring-border">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value) => {
              if (value) {
                const params = new URLSearchParams(searchParams.toString());
                params.set("view", value);
                router.replace(`?${params}`, { scroll: false });
              }
            }}
            className="size-full rounded-none"
          >
            <ToggleGroupItem
              value="firetruck"
              className="size-full rounded-none text-lg"
            >
              Fahrzeug-Details
            </ToggleGroupItem>
            <ToggleGroupItem
              value="incident"
              className="size-full rounded-none text-lg"
            >
              Einsatz-Details
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="grid col-span-3 grid-cols-subgrid gap-0.25">
        <InfoCard description="Stichwort" value={incident?.keyword} />
        <InfoCard description="Adresse" value={incident?.adress} />
        <InfoCard
          description="Alarmzeit"
          value={incident?.alarmTime && formatDate(incident.alarmTime)}
        />
      </div>
    </div>
  );
};

export default IncidentInformations;
