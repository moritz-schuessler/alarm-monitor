"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useGetMe from "@/hooks/use-get-me";
import { useQueryClient } from "@tanstack/react-query";

const SelectFiretruck = () => {
  const queryClient = useQueryClient();

  const { data } = useGetMe();
  return (
    <Dialog>
      <DialogTrigger className="flex bg-secondary justify-center items-center size-full hover:bg-border ring ring-border text-lg">
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
                  onClick={() => {
                    console.log("test");

                    queryClient.setQueryData(
                      ["selected-firetruck"],
                      firetruck.id,
                    );
                  }}
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

export default SelectFiretruck;
