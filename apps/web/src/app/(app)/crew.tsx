import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAddFiretruckToIncident from "@/hooks/use-add-firefighter-to-crew";
import useGetMe from "@/hooks/use-get-me";
import {
  FirefighterDetails,
  FiretruckDetails,
} from "@alarm-monitor/shared/src";
import { ReactNode } from "react";

interface Props {
  firetruck: FiretruckDetails;
}

interface FirefighterSeatProps {
  type: "firefighter";
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
    <Seat key={firefighter.id} type="firefighter" firefighter={firefighter} />
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
  const mutation = useAddFiretruckToIncident();

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
                        mutation.mutate({
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
      <div className="p-4 bg-background ring ring-border">
        {props.firefighter.name}
      </div>
    );
  }
};

export default Crew;
