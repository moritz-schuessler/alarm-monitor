import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import IncidentGuard from "./_components/incident-guard";

const AppLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const signOutAction = async () => {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("session");
  };

  return (
    <IncidentGuard>
      <div className="flex flex-col h-screen p-4 gap-4 ">
        <header className="flex justify-between items-center">
          <h1 className="text-xl">Einsatzmonitor</h1>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">
              Abmelden
            </Button>
          </form>
        </header>
        <main className="flex justify-center items-center placeholder-chart h-full ">
          {children}
        </main>
      </div>
    </IncidentGuard>
  );
};

export default AppLayout;
