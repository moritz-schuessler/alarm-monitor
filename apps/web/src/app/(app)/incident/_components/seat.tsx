import { Badge } from "@/components/ui/badge";
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
  FirefighterEntity,
} from "@alarm-monitor/shared/src";
import { UserRoundMinus } from "lucide-react";
import { ReactNode } from "react";

interface FirefighterSeatProps {
  type: "firefighter";
  firetruckId: string;
  firefighter: FirefighterDetails;
}

interface EmptySeatProps {
  type: "empty";
  firetruckId: string;
  children?: ReactNode;
  availableFirefighters: FirefighterEntity[];
}

type SeatProps = FirefighterSeatProps | EmptySeatProps;

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

              {props.availableFirefighters.map((firefighter) => {
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
    const qualificationsToFirefighter =
      props.firefighter.qualificationToFirefighter;

    const badges = filterQualifications(qualificationsToFirefighter);

    return (
      <div className="flex flex-col ring ring-border gap-0.25 bg-background justify-between">
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
        <div className="flex flex-wrap p-4 gap-2">
          {badges.map((qualificationToFirefighter) => {
            return (
              <Badge
                key={
                  qualificationToFirefighter?.qualification.id +
                  props.firefighter.id
                }
                variant={
                  qualificationToFirefighter?.status === "active"
                    ? "secondary"
                    : "destructive"
                }
                className={`text-md ${qualificationToFirefighter?.status === "active" && qualificationToFirefighter.qualification.name === "Atemschutzgeräteträger" && "bg-green-700/20"}`}
              >
                {qualificationToFirefighter?.qualification.name}
              </Badge>
            );
          })}
        </div>
      </div>
    );
  }
};

const filterQualifications = (
  qualificationToFirefighter: FirefighterDetails["qualificationToFirefighter"],
) => {
  const filteredQualifications = [];

  const findActiveQualification = (name: string) =>
    qualificationToFirefighter.find(
      (q) => q.qualification.name === name && q.status === "active",
    );

  const leadership = {
    verbandsfuehrer: findActiveQualification("Verbandsführer"),
    zugfuehrer: findActiveQualification("Zugführer"),
    gruppenfuehrer: findActiveQualification("Gruppenführer"),
    truppfuehrer: findActiveQualification("Truppführer"),
    grundlehrgang: findActiveQualification("Grundlehrgang"),
  };

  if (leadership.grundlehrgang) {
    const highestLeadership =
      leadership.verbandsfuehrer ??
      leadership.zugfuehrer ??
      leadership.gruppenfuehrer ??
      leadership.truppfuehrer ??
      leadership.grundlehrgang;

    filteredQualifications.push(highestLeadership);
  }

  const agt = findActiveQualification("Atemschutzgeräteträger");

  if (agt) {
    const AGT_REQUIREMENTS = [
      "Atemschutz/Atemschutzstrecke",
      "Atemschutz/Unterweisung",
      "Atemschutz/Einsatz/Übung",
      "G26.3",
    ];

    const activeRequirements = AGT_REQUIREMENTS.filter((reqName) =>
      findActiveQualification(reqName),
    );

    const agtWithStatus = {
      ...agt,
      status:
        activeRequirements.length === AGT_REQUIREMENTS.length
          ? "active"
          : "expired",
    };

    filteredQualifications.push(agtWithStatus);
  }

  const maschinist = findActiveQualification("Maschinist");
  if (maschinist) {
    filteredQualifications.push(maschinist);
  }

  const drivingLicenses = {
    ce: findActiveQualification("CE"),
    c: findActiveQualification("C"),
    feuerwehr: findActiveQualification("Feuerwehrführerschein"),
  };

  const highestLicense =
    drivingLicenses.ce ?? drivingLicenses.c ?? drivingLicenses.feuerwehr;
  if (highestLicense) {
    filteredQualifications.push(highestLicense);
  }

  return filteredQualifications;
};

export default Seat;
