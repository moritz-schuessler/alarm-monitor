"use client";

import useGetIncident from "@/hooks/use-get-incident";
import ShortInformation from "./short-information";
import { redirect } from "next/navigation";
import AssignedUnits from "./assigned-units";
import CrewOverview from "./crew-overview";

const Page = () => {
  const { data, status } = useGetIncident();

  if (status === "error") {
    redirect("/select-incident");
  }

  if (status === "success")
    return (
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] flex-col size-full gap-8">
        <ShortInformation incident={data!.incident!} />
        <div className="grid grid-cols-subgrid col-span-3">
          <CrewOverview />
          <AssignedUnits stations={data.stations} />
        </div>
      </div>
    );
};

export default Page;
