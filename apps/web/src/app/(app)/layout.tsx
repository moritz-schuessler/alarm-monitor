import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col h-screen">
      <header className="flex w-screen justify-between p-4">
        <h1>Einsatzmonitor</h1>
        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Abmelden
          </Button>
        </form>
      </header>
      <main className="flex justify-center items-center p-4 h-full ">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
