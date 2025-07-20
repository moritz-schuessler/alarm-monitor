import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getStations from "@/data/domains/stations/getStations";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

const SelectUserPage = async () => {
  const signInAction = async (formData: FormData) => {
    "use server";
    const radioIdentification = formData.get("radioIdentification") as string;

    await signIn(radioIdentification);

    redirect("/");
  };

  const stations = await getStations();

  return (
    <main className="grid place-items-center h-screen w-screen">
      <form action={signInAction} className="flex gap-4 justify-center">
        <Select name="radioIdentification">
          <SelectTrigger className=" w-[40ch]">
            <SelectValue placeholder="Feuerwehrauto" />
          </SelectTrigger>
          <SelectContent>
            {stations.map((station) => {
              return (
                <SelectGroup key={station.id}>
                  <SelectLabel>{station.name}</SelectLabel>
                  {station.firetrucks.map((firetruck) => {
                    return (
                      <SelectItem
                        value={firetruck.radioIdentification}
                        key={firetruck.id}
                      >
                        {firetruck.radioIdentification}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              );
            })}
          </SelectContent>
        </Select>
        <Button type="submit">Sign in</Button>
      </form>
    </main>
  );
};

export default SelectUserPage;
