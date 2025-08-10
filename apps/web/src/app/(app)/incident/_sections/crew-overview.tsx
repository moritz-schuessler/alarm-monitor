"use client";

import useGetFiretruck from "@/hooks/use-get-firetruck";
import useGetMe from "@/hooks/use-get-me";
import formatCrew from "@/utils/formatCrew";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoCard } from "@/components/ui/card/info-card";
import { Lock, LockOpen } from "lucide-react";
import useUpdateCrewLocked from "@/hooks/use-update-crew-locked";
import Stats from "../stats";
import Crew from "../crew";

const CrewOverview = () => {
  const updateCrewLockedMutation = useUpdateCrewLocked();

  const { data: session } = useGetMe();

  const [selectedFiretruck, setSelectedFiretruck] = useState("");

  const { data: firetruck } = useGetFiretruck(selectedFiretruck || "");

  if (session && !selectedFiretruck) {
    setSelectedFiretruck(session.firetruck.id);
  }

  if (!firetruck) {
    return "...Loading";
  }

  return (
    <div className="flex flex-col h-full border border-border rounded-lg col-span-2 overflow-hidden">
      <Accordion type="single" defaultValue="crew" className="gap-0.25">
        <AccordionItem value="stats" className="gap-0.25">
          <div className="grid grid-cols-3 gap-0.25 ring ring-border">
            <div className="p-4 col-span-2 items-center ring ring-border">
              <div className="text-muted-foreground">
                {session?.station?.name}
              </div>
              <div className="text-xl">{firetruck?.radioIdentification}</div>
            </div>
            <div className="flex ring ring-border gap-0.25">
              <SelectFiretruck setSelectedFiretruck={setSelectedFiretruck} />
              <AccordionTrigger className="p-4 bg-secondary justify-center items-center rounded-none hover:bg-border ring ring-border" />
            </div>
          </div>
          <AccordionContent>
            <Stats firetruck={firetruck} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="crew" className="gap-0.25">
          <div className="grid grid-cols-3 gap-0.25 justify-center ring ring-border">
            <div className="col-span-2 h-full flex items-center justify-between">
              <div className="text-xl p-4">Mannschaft</div>
            </div>
            <div className="flex gap-0.25 ">
              <div className="flex w-full ring ring-border justify-between gap-0.25">
                <InfoCard
                  description="Besatzung"
                  value={formatCrew(firetruck!.crew)}
                  className="w-full"
                />
                <Button
                  size="none"
                  onClick={() => {
                    updateCrewLockedMutation.mutate({
                      firetruckId: firetruck.id,
                      locked: !firetruck.crew.isLocked,
                    });
                  }}
                  className="flex h-full rounded-none p-4 justify-center items-center ring ring-border bg-secondary hover:bg-border"
                >
                  {firetruck.crew.isLocked ? (
                    <Lock className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5" />
                  ) : (
                    <LockOpen className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5" />
                  )}
                </Button>
              </div>
              <AccordionTrigger className="p-4 bg-secondary justify-center items-center rounded-none hover:bg-border ring ring-border" />
            </div>
          </div>
          <AccordionContent className="ring ring-border">
            <Crew firetruck={firetruck} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const SelectFiretruck = ({
  setSelectedFiretruck,
}: {
  setSelectedFiretruck: Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useGetMe();
  return (
    <Dialog>
      <DialogTrigger className="flex bg-secondary justify-center items-center size-full hover:bg-border ring ring-border">
        Fahrzeug wechseln
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fahrzeug wechseln</DialogTitle>
        </DialogHeader>
        {data &&
          data.station?.firetrucks.map((firetruck) => {
            return (
              <DialogClose key={firetruck.id} asChild>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedFiretruck(firetruck.id)}
                >
                  {firetruck.radioIdentification}
                </Button>
              </DialogClose>
            );
          })}
      </DialogContent>
    </Dialog>
  );
};

export default CrewOverview;
