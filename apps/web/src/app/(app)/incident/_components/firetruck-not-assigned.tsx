import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useAddFiretruckToIncident from "@/hooks/use-add-firetruck-to-incident";
import useIncident from "@/hooks/use-get-incident";

import { FiretruckDetails } from "@alarm-monitor/shared/src";

interface FiretruckNotAssignedProps {
  firetruck: FiretruckDetails;
}

const FiretruckNotAssigned = ({ firetruck }: FiretruckNotAssignedProps) => {
  const { data, isPending } = useIncident();

  const mutation = useAddFiretruckToIncident();

  const incident = data?.incident;

  return (
    <div className="flex flex-col p-8 items-center size-full">
      <Alert className="flex flex-col gap-4 p-6 w-fit bg-background">
        <div className="flex-col gap-2">
          <AlertTitle className="text-lg font-semibold">
            Fahrzeug ist nicht dem Einsatz zugeordnet
          </AlertTitle>
          <AlertDescription className="text-muted-foreground text-md">
            Das Fahrzeug {firetruck.radioIdentification} ist aktuell nicht Teil
            dieses Einsatzes.
          </AlertDescription>
        </div>
        <div className="flex w-full justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              if (incident?.id) {
                mutation.mutate({
                  firetruckId: firetruck.id,
                  incidentId: incident?.id,
                });
              }
            }}
            disabled={isPending}
          >
            {mutation.isPending
              ? "Wird hinzugefügt..."
              : "Zum Einsatz hinzufügen"}
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default FiretruckNotAssigned;
