"use client";

import useGetFiretruck from "@/hooks/use-get-firetruck";
import useGetMe from "@/hooks/use-get-me";
import formatCrew from "@/utils/formatCrew";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoCard } from "@/components/ui/card/info-card";
import { Lock, LockOpen } from "lucide-react";
import useUpdateCrewLocked from "@/hooks/use-update-crew-locked";

import { Skeleton } from "@/components/ui/skeleton";
import useSelectedFiretruck from "@/hooks/utils/use-selected-firetruck";
import Stats from "./stats";
import SelectFiretruck from "../../_components/select-firetruck";
import Crew from "./crew";

const CrewOverview = () => {
  const updateCrewLockedMutation = useUpdateCrewLocked();

  const { data: selectedFiretruck } = useSelectedFiretruck();

  const { data: me } = useGetMe();
  const { data: firetruck, isPending } = useGetFiretruck(
    selectedFiretruck || "",
  );

  return (
    <Accordion type="single" defaultValue="crew" className="gap-0.25">
      <AccordionItem value="stats" className="gap-0.25">
        <div className="grid grid-cols-3 gap-0.25 ring ring-border">
          <div className="flex flex-col p-4 col-span-2 ring ring-border">
            {firetruck ? (
              <>
                <div className="text-muted-foreground">{me?.station?.name}</div>
                <div className="text-xl">{firetruck?.radioIdentification}</div>
              </>
            ) : (
              <>
                <Skeleton className="h-[20px] w-1/3 my-1 rounded-sm" />
                <Skeleton className="h-[20px] w-2/3 my-1 rounded-sm" />
              </>
            )}
          </div>
          <div className="flex ring ring-border gap-0.25">
            <SelectFiretruck />
            <AccordionTrigger className="p-4 bg-secondary justify-center items-center rounded-none hover:bg-border ring ring-border" />
          </div>
        </div>
        <AccordionContent>{firetruck && <Stats />}</AccordionContent>
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
                value={firetruck && formatCrew(firetruck!.crew)}
                className="w-full"
              />
              <Button
                size="none"
                disabled={isPending}
                onClick={() => {
                  updateCrewLockedMutation.mutate({
                    firetruckId: firetruck!.id,
                    locked: !firetruck!.crew.isLocked,
                  });
                }}
                className="flex h-full rounded-none p-4 justify-center items-center ring ring-border bg-secondary hover:bg-border"
              >
                {firetruck && firetruck.crew.isLocked ? (
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
          {firetruck && <Crew firetruck={firetruck} />}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CrewOverview;
