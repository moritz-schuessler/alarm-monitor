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
import { StationDetails } from "@alarm-monitor/shared/src";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SelectUserPage = async () => {
  const signInAction = async (formData: FormData) => {
    "use server";
    const radioIdentification = formData.get("radioIdentification") as string;

    const cookieStore = await cookies();

    console.log("test");

    const response = await fetch("http://localhost:3000/api/backend/auth", {
      method: "POST",
      body: JSON.stringify({ radioIdentification }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return;
    }

    const { access_token } = await response.json();

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookieStore.set("session", access_token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });

    redirect("/incident");
  };

  const reponse = await fetch("http://localhost:3000/api/backend/stations");
  const stations = (await reponse.json()) as StationDetails[];

  return (
    <main className="grid place-items-center h-screen w-screen">
      <form action={signInAction} className="flex gap-4 justify-center">
        <Select name="radioIdentification">
          <SelectTrigger className=" w-[40ch]">
            <SelectValue placeholder="Feuerwehrauto" />
          </SelectTrigger>
          <SelectContent>
            {stations &&
              stations.map((station) => {
                return (
                  <SelectGroup key={station!.id}>
                    <SelectLabel>{station!.name}</SelectLabel>
                    {station!.firetrucks.map((firetruck) => {
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
