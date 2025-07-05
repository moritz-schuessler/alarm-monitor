import db from "..";

const getFiretruckById = async (firetruckId: string) => {
  console.log(firetruckId);

  return await db.query.firetrucks.findFirst({
    where: (firetruck, { eq }) => eq(firetruck.id, firetruckId),
  });
};

export { getFiretruckById };
