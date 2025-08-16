"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAddStationToIncident from "@/hooks/incidents/use-add-station-to-incident";
import useGetIncidents from "@/hooks/incidents/use-get-incidents";
import useRemoveStationFromIncident from "@/hooks/incidents/use-remove-station-from-incident";
import useGetStations from "@/hooks/stations/use-get-stations";
import { formatDate } from "@/lib/date";
import { Plus, X } from "lucide-react";

const MockPage = () => {
  const { data: incidents } = useGetIncidents();
  const { data: stations } = useGetStations();
  const addStationMutation = useAddStationToIncident();
  const removeStationMutation = useRemoveStationFromIncident();

  return (
    <div className="flex flex-col p-4 gap-8">
      {incidents?.map((incident) => {
        return (
          <section key={incident.id} className="flex flex-col gap-2">
            <h2 className="flex gap-4 text-xl font-bold">
              <div>{incident?.keyword}</div>
              <div>{incident.adress}</div>
              <div>{formatDate(incident.alarmTime)}</div>
            </h2>
            <div className="flex gap-4 text-lg font-medium">
              {incident.incidentsToStations.map((incidentToStation) => {
                return (
                  <Button
                    key={incidentToStation.stationId}
                    className="flex gap-2"
                    variant="secondary"
                    onClick={() => {
                      removeStationMutation.mutate({
                        incidentId: incident.id,
                        stationId: incidentToStation.stationId,
                      });
                    }}
                  >
                    <div>{incidentToStation.station.name}</div>
                    <X />
                  </Button>
                );
              })}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" disabled={!stations}>
                    <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Stations</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-2">
                    {stations &&
                      stations!.map((station) => {
                        return (
                          <DialogClose key={station.id} asChild>
                            <Button
                              onClick={() => {
                                addStationMutation.mutate({
                                  incidentId: incident.id,
                                  stationId: station.id,
                                });
                              }}
                              variant="secondary"
                            >
                              {station.name}
                            </Button>
                          </DialogClose>
                        );
                      })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MockPage;
