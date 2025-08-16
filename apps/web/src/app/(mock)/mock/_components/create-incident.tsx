import { Button } from "@/components/ui/button";
import useCreateIncident from "@/hooks/incidents/use-create-incident";
import { FormEvent } from "react";

const CreateIncident = () => {
  const mutation = useCreateIncident();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword")!.toString();
    const adress = formData.get("adress")!.toString();

    mutation.mutate({ keyword, adress });
    event.currentTarget.reset();
  };

  return (
    <div className="flex p-4 ring ring-border rounded-md">
      <form onSubmit={handleSubmit} className="flex gap-8 w-full items-center">
        <div className="flex gap-4 w-full items-center">
          <label htmlFor="keyword">Einsatzstichwort:</label>
          <input
            id="keyword"
            name="keyword"
            placeholder="Einsatzstichwort eingeben"
            className="w-full ring ring-border rounded-md p-1"
            required
          />
        </div>
        <div className="flex gap-4 w-full items-center">
          <label htmlFor="adress">Adresse:</label>
          <input
            id="adress"
            name="adress"
            placeholder="Adresse eingeben"
            className="w-full ring ring-border rounded-md p-1"
            required
          />
        </div>
        <Button variant="secondary" type="submit">
          Einsatz hinzufügen
        </Button>
      </form>
    </div>
  );
};

export default CreateIncident;
