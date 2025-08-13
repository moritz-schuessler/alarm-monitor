import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAddFirefighterToCrew from "@/hooks/use-add-firefighter-to-crew";
import useGetMe from "@/hooks/use-get-me";
import useRemoveFirefighterFromCrew from "@/hooks/use-remove-firefighter-from-crew";
import {
  FirefighterDetails,
  FiretruckDetails,
} from "@alarm-monitor/shared/src";
import { UserRoundMinus } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  firetruck: FiretruckDetails;
}

interface FirefighterSeatProps {
  type: "firefighter";
  firetruckId: string;
  firefighter: FirefighterDetails;
}

interface EmptySeatProps {
  type: "empty";
  firetruckId: string;
  children?: ReactNode;
}

type SeatProps = FirefighterSeatProps | EmptySeatProps;

const Crew = ({ firetruck }: Props) => {
  const emptySeats = firetruck!.seats - firetruck!.crew!.firefighters.length;

  const crewElements = firetruck!.crew!.firefighters.map((firefighter) => (
    <Seat
      key={firefighter.id}
      type="firefighter"
      firefighter={firefighter}
      firetruckId={firetruck.id}
    />
  ));

  const emptySeatElements = Array.from({ length: emptySeats }, (_, index) => {
    if (index === 0) {
      return (
        <Seat
          key={`seat-empty-${index}`}
          type="empty"
          firetruckId={firetruck!.id}
        >
          +
        </Seat>
      );
    }

    return (
      <Seat
        key={`seat-empty-${index}`}
        type="empty"
        firetruckId={firetruck!.id}
      />
    );
  });

  return (
    <div className="grid grid-cols-3 auto-rows-fr h-full bg-secondary gap-0.25">
      {[...crewElements, ...emptySeatElements]}
    </div>
  );
};

const Seat = (props: SeatProps) => {
  const addFirefighterMutation = useAddFirefighterToCrew();
  const removeFirefighterMutation = useRemoveFirefighterFromCrew();

  const { data } = useGetMe();

  if (props.type === "empty") {
    if (data) {
      return (
        <div className="bg-background justify-center items-center size-full ring ring-border">
          <Dialog>
            <DialogTrigger className="flex size-full justify-center items-center">
              {props.children}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Person hinzufügen</DialogTitle>
              </DialogHeader>

              {data.station?.firefighters.map((firefighter) => {
                return (
                  <DialogClose key={firefighter.id} asChild>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        addFirefighterMutation.mutate({
                          firetruckId: props.firetruckId,
                          firefighterId: firefighter.id,
                        });
                      }}
                    >
                      {firefighter.name}
                    </Button>
                  </DialogClose>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }

  if (props.type === "firefighter") {
    return (
      <div className="flex flex-col ring ring-border gap-0.25 bg-background">
        <div className="flex justify-between">
          <div className="flex items-center p-4 w-full">
            {props.firefighter.name}
          </div>
          <Button
            size="none"
            onClick={() => {
              removeFirefighterMutation.mutate({
                firetruckId: props.firetruckId,
                firefighterId: props.firefighter.id,
              });
            }}
            className="rounded-none p-4 bg-secondary justify-center items-center hover:bg-border ring ring-border rounded-bl-lg"
          >
            <UserRoundMinus className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    );
  }
};

export default Crew;
