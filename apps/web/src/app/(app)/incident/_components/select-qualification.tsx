import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/card/stat-card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useIncident from "@/hooks/use-get-incident";
import useSelectedStats from "@/hooks/utils/use-selected-stats";
import { queryFirefighters } from "@/lib/firefighter-helper";
import {
  IncidentDetails,
  QualificationEntity,
} from "@alarm-monitor/shared/src";
import { useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const SelectQualification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isPending } = useSelectedStats();
  const { data: incident } = useIncident();

  const qualifications =
    incident && data ? getQualifications(incident, data) : [];
  const firefighters = incident
    ? incident?.firetrucks.flatMap((truck) => truck.crew.firefighters)
    : [];

  const stats =
    data?.map((stat) => {
      return queryFirefighters(firefighters)
        .filterByAnyQualification(stat)
        .toArray();
    }) ?? [];

  return (
    <>
      {stats?.map((stat, index) => {
        return (
          <div key={data![index]!} className="flex flex-col relative">
            <div className="flex justify-end absolute right-0">
              <Button
                size="none"
                onClick={() => {
                  const newState = data!.filter(
                    (statsElement) => statsElement !== data![index],
                  );

                  const params = new URLSearchParams(searchParams.toString());
                  params.set("stats", newState.join(","));
                  router.replace(`?${params}`, { scroll: false });

                  queryClient.setQueryData(["selected-stats"], newState);
                }}
                className="rounded-none p-4 bg-secondary justify-center items-center hover:bg-border ring ring-border rounded-bl-lg"
              >
                <Minus className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
              </Button>
            </div>
            <StatCard
              description={data![index]}
              value={stat.length}
              className="h-full"
            />
          </div>
        );
      })}
      {stats?.length < 3 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="flex justify-center items-center size-full bg-background ring ring-border rounded-none"
              disabled={isPending}
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Qualifikationen</DialogTitle>
            </DialogHeader>
            <div>
              {Object.entries(qualifications).map((topic) => {
                return (
                  <div key={topic[0]} className="font-semibold">
                    <div>{topic[0]}</div>
                    <div className="flex flex-wrap w-full">
                      {topic[1].map((qualification, index) => {
                        return (
                          <DialogClose key={qualification.id + index} asChild>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                const newState = stats
                                  ? [...data!, qualification.name]
                                  : [];

                                const params = new URLSearchParams(
                                  searchParams.toString(),
                                );
                                params.set("stats", newState.join(","));
                                router.replace(`?${params}`, { scroll: false });

                                queryClient.setQueryData(
                                  ["selected-stats"],
                                  newState,
                                );
                              }}
                            >
                              {qualification.name}
                            </Button>
                          </DialogClose>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

const getQualifications = (
  incident: IncidentDetails,
  selectedStats: string[],
) => {
  const qualificationsArray = incident.firetrucks.flatMap((firetruck) =>
    firetruck.crew.firefighters.flatMap((firefighter) =>
      firefighter.qualificationToFirefighter
        .filter((q) => !selectedStats.includes(q.qualification.name))
        .map((q) => q.qualification),
    ),
  );

  const qualifications = Array.from(
    new Map(
      qualificationsArray.map((qualification) => [
        qualification.name,
        qualification,
      ]),
    ).values(),
  );

  const groupedQualifications = qualifications.reduce(
    (grouped, qualification) => {
      if (!grouped[qualification.type]) {
        grouped[qualification.type] = [];
      }
      grouped[qualification.type].push(qualification);
      return grouped;
    },
    {} as Record<QualificationEntity["type"], QualificationEntity[]>,
  );

  return groupedQualifications;
};

export default SelectQualification;
