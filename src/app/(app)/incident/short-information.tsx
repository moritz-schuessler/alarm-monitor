import { Information } from "@/components/ui/information";
import { Incidents } from "@/data/schema";
import { formatDate } from "@/lib/date";

interface Props {
  incident: Incidents;
}

const ShortInformation = ({ incident }: Props) => {
  return (
    <div className="h-fit w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl">
      <h2 className="p-4">Einsatzinformationen</h2>
      <div className="flex justify-center items-center divide-x-1 divide-border">
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
