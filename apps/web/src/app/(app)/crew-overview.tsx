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
    <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg col-span-2 grid grid-cols-3 grid-rows-[auto_auto_1fr] overflow-hidden">
      <div className="grid-cols-subgrid col-span-3 grid h-fit">
        <div className="p-4 grid-cols-subgrid col-span-2 w-full size-full ring-1 ring-border">
          <div className="text-muted-foreground">{session?.station?.name}</div>
          <div className="text-xl">{firetruck?.radioIdentification}</div>
        </div>
        <div>
          <SelectFiretruck setSelectedFiretruck={setSelectedFiretruck} />
        </div>
      </div>
      <div className="divide-border divide-x-1 items-center h-fit justify-between grid-cols-subgrid col-span-3 grid">
        <div className="flex text-xl p-4 col-span-2 h-full items-center">
          <div>Mannschaft</div>
        </div>
        <Information
          description="Besatzung"
          text={formatCrew(firetruck!.crew)}
        />
      </div>
      <Crew firetruck={firetruck} />
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
      <DialogTrigger className="ring-1 ring-border flex bg-secondary justify-center items-center size-full hover:bg-border">
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
