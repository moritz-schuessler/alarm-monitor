"use client";

import useSession from "@/hooks/use-auth";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>{session?.firetruck.radioIdentification}</div>
    </div>
  );
};

export default Home;
