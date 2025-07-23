import { Information } from "@/components/ui/information";
import useGetFiretruck from "@/hooks/use-get-firetruck";
import useGetMe from "@/hooks/use-get-me";
import formatCrew from "@/utils/formatCrew";

const CrewOverviewWrapper = () => {
  const { data: session } = useGetMe();

  const { data: firetruck, status } = useGetFiretruck(session!.firetruck.id);

  if (status !== "success") {
    return "...Loading";
  }

  return (
    <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-2 grid grid-cols-3 grid-rows-[auto_auto_1fr]">
      <div className="grid-cols-subgrid col-span-3 grid h-fit">
        <div className="p-4 grid-cols-subgrid col-span-2">
          <div className="text-muted-foreground">{session?.station?.name}</div>
          <div className="text-2xl">{firetruck?.radioIdentification}</div>
        </div>
      </div>
      <div className="divide-border divide-x-1 items-center h-fit justify-between grid-cols-subgrid col-span-3 grid">
        <div className="flex text-2xl p-4 col-span-2 h-full items-center">
          <div>Mannschaft</div>
        </div>
        <Information
          description="Besatzung"
          text={formatCrew(firetruck!.crew)}
        />
      </div>
      <div className="grid grid-cols-subgrid col-span-3 h-full divide-border divide-x-1 divide-y-1">
        {firetruck?.crew?.firefighters.map((firefighter) => {
          return (
            <div key={firefighter.id} className="p-4">
              {firefighter.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrewOverviewWrapper;
