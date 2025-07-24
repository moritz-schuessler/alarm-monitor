import {
  FirefighterDetails,
  FiretruckDetails,
} from "@/data/domains/firetrucks/firetruck.types";

interface Props {
  firetruck: FiretruckDetails;
}

interface FirefighterSeatProps {
  type: "firefighter";
  firefighter: FirefighterDetails;
}

interface EmptySeatProps {
  type: "empty";
}

type SeatProps = FirefighterSeatProps | EmptySeatProps;

const Crew = ({ firetruck }: Props) => {
  const emptySeats = firetruck!.seats - firetruck!.crew!.firefighters.length;

  const crewElements = firetruck!.crew!.firefighters.map((firefighter) => (
    <Seat key={firefighter.id} type="firefighter" firefighter={firefighter} />
  ));

  const emptySeatElements = Array.from({ length: emptySeats }, (_, index) => {
    return <Seat key={`seat-empty-${index}`} type="empty" />;
  });

  return (
    <div className="grid grid-cols-subgrid col-span-3 h-full divide-border divide-x-1 divide-y-1 bg-border">
      {[...crewElements, ...emptySeatElements]}
    </div>
  );
};

const Seat = (props: SeatProps) => {
  if (props.type === "empty") {
    return (
      <div className="p-4 bg-background  flex justify-center items-center"></div>
    );
  }

  return <div className="p-4 bg-background">{props.firefighter.name}</div>;
};

export default Crew;
