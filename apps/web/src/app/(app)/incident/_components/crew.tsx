import { FiretruckDetails } from "@alarm-monitor/shared/src";
import Seat from "./seat";
import useGetMe from "@/hooks/use-get-me";

interface Props {
  firetruck: FiretruckDetails;
}

const Crew = ({ firetruck }: Props) => {
  const { data } = useGetMe();

  const firefighters = data ? data.station.firefighters : [];

  const emptySeats = firetruck!.seats - firetruck!.crew!.firefighters.length;

  const availableFirefighters = firefighters.filter(
    (firefighter) =>
      !firetruck.crew.firefighters.some((f) => f.name === firefighter.name),
  );

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
          availableFirefighters={availableFirefighters ?? []}
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
        availableFirefighters={availableFirefighters ?? []}
      />
    );
  });

  return (
    <div className="grid grid-cols-3 auto-rows-fr h-full bg-secondary gap-0.25">
      {[...crewElements, ...emptySeatElements]}
    </div>
  );
};

export default Crew;
