import db from "../../database";

const getFiretruckById = async (firetruckId: string) => {
  console.log(firetruckId);

  return await db.query.firetrucks.findFirst({
    where: (firetruck, { eq }) => eq(firetruck.id, firetruckId),
  });
};

const getFiretruckByRadioIdentification = async (
  radioIdentification: string,
) => {
  const response = await db.query.firetrucks.findFirst({
    where: (firetrucks, { eq }) =>
      eq(firetrucks.radioIdentification, radioIdentification),
    with: {
      station: true,
    },
  });

  return response;
};

export { getFiretruckById, getFiretruckByRadioIdentification };
