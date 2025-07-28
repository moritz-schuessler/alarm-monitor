import { Information } from "@/components/ui/information";
import useGetFiretruck from "@/hooks/use-get-firetruck";
import useGetMe from "@/hooks/use-get-me";
import formatCrew from "@/utils/formatCrew";
import Crew from "./crew";
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

const CrewOverviewWrapper = () => {
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
      <Accordion
        type="single"
        defaultValue="crew"
        className="divide-y divide-border"
      >
        <AccordionItem
          value="stats"
          className="divide-y divide-border data-[state=closed]:divide-y-0"
        >
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="p-4 col-span-2 items-center">
              <div className="text-muted-foreground">
                {session?.station?.name}
              </div>
              <div className="text-xl">{firetruck?.radioIdentification}</div>
            </div>
            <div className="flex divide-x divide-border">
              <SelectFiretruck setSelectedFiretruck={setSelectedFiretruck} />
              <AccordionTrigger className="p-4 bg-secondary justify-center items-center rounded-none hover:bg-border" />
            </div>
          </div>
          <AccordionContent className="">
            <div className="h-full">TODO: Stats</div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="crew"
          className="divide-y divide-border data-[state=closed]:divide-y-0"
        >
          <div className="grid grid-cols-3 divide-x divide-border justify-center">
            <div className="text-xl p-4 col-span-2 h-full flex items-center">
              Mannschaft
            </div>
            <div className="flex">
              <div className="w-full">
                <Information
                  description="Besatzung"
                  text={formatCrew(firetruck!.crew)}
                />
              </div>
              <AccordionTrigger className="p-4 bg-secondary justify-center items-center rounded-none hover:bg-border" />
            </div>
          </div>
          <AccordionContent className="">
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
      <DialogTrigger className="flex bg-secondary justify-center items-center size-full hover:bg-border">
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

export default CrewOverviewWrapper;
