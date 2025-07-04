import { auth } from "@/lib/auth";

const Home = async () => {
  const session = await auth();

  return <div>{session!.firetruck.radioIdentification}</div>;
};

export default Home;
