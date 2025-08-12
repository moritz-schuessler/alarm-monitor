import { StatCard } from "@/components/ui/card/stat-card";

const IncidentOverview = () => {
  return (
    <div className="grid grid-cols-3 gap-0.25 ring ring-border h-full auto-rows-[auto_1fr] ">
      <div className="grid grid-cols-subgrid col-span-3 gap-0.25">
        <div className="text-xl p-4 col-span-3 ring ring-border">
          Einsatzstatisiken
        </div>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 h-full">
        <StatCard description="Placeholder" value={12} />
      </div>
    </div>
  );
};

export default IncidentOverview;
