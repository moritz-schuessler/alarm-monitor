import { Information } from "@/components/ui/information";
import { IncidentEntity } from "@alarm-monitor/shared/src";
import { formatDate } from "@/lib/date";

interface Props {
  incident: IncidentEntity;
}

const ShortInformation = ({ incident }: Props) => {
  return (
    <div className="h-fit w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl col-span-3">
      <h2 className="p-4">Einsatzinformationen</h2>
      <div className="grid grid-cols-[repeat(3,minmax(auto,1fr))] divide-x-1 divide-border">
        <Information description="Stichwort" text={incident.keyword!} />
        <Information description="Adresse" text={incident.adress!} />
        <Information
          description="Alarmzeit"
          text={formatDate(incident.alarmTime!)}
        />
      </div>
    </div>
  );
};

export default ShortInformation;
