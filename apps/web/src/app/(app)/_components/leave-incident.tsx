"use client";

import { Button } from "@/components/ui/button";
import useGetMe from "@/hooks/use-get-me";
import useRemoveFiretruckFromIncident from "@/hooks/use-remove-firetruck-from-incident";

const LeaveIncident = () => {
  const mutation = useRemoveFiretruckFromIncident();

  const { data: me, isPending } = useGetMe();

  return (
    <form
      action={() => {
        console.log("test");

        if (!me) {
          return;
        }

        mutation.mutate({ firetruckId: me.firetruck.id });
      }}
    >
      <Button type="submit" variant="outline" disabled={isPending}>
        Einsatz verlassen
      </Button>
    </form>
  );
};

export default LeaveIncident;
