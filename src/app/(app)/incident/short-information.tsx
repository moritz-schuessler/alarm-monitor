import { Incidents } from "@/data/schema";

interface Props {
  incident: Incidents;
}

const ShortInformation = ({ incident }: Props) => {
  const date = new Date(incident.alarmTime!).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="h-fit w-full divide-y-1 divide-border border-1 border-border rounded-lg text-xl">
      <h2 className="p-4">Einsatzinformationen</h2>
      <div className="flex justify-center items-center divide-x-1 divide-border">
        <div className="flex flex-col justify-center items-center p-4 grow-1 basis-0 ">
          <div className="text-muted-foreground text-sm">Stichwort</div>
          <div className="text-nowrap">{incident.keyword}</div>
        </div>
        <div className="flex flex-col justify-center items-center p-4 grow-1 basis-0 ">
          <div className="text-muted-foreground text-sm">Adresse</div>
          <div className="text-nowrap ">{incident.adress}</div>
        </div>
        <div className="flex flex-col justify-center items-center p-4 grow-1 basis-0">
          <div className="text-muted-foreground text-sm">Alarmzeit</div>
          <div className="text-nowrap">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default ShortInformation;
