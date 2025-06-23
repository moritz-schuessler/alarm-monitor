import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

const SelectUserPage = () => {
  const signInAction = async (formData: FormData) => {
    "use server";
    const radioIdentification = formData.get("radioIdentification") as string;

    signIn(radioIdentification);

    redirect("/");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form action={signInAction}>
          <input type="text" name="radioIdentification" />
          <button type="submit">Sign In</button>
        </form>
      </main>
    </div>
  );
};

export default SelectUserPage;
