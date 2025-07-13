"use client";

import useIncident from "@/hooks/use-incident";
import ShortInformation from "./short-information";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: incident, status } = useIncident();

  if (status === "error") {
    redirect("/select-incident");
  }

  if (status === "success")
    return (
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] flex-col size-full gap-8">
        <ShortInformation incident={incident!} />
        <div className="grid grid-cols-subgrid col-span-3">
          <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-2">
            Mannschaft...
          </div>
          <div className="w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-1">
            Einheiten...
          </div>
        </div>
      </div>
    );
};

export default Page;
