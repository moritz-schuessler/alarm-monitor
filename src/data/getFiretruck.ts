import db from "./index";

const getFiretruck = async (radioIdentification: string) => {
  const response = await db.query.firetrucks.findFirst({
    where: (firetrucks, { eq }) =>
      eq(firetrucks.radioIdentification, radioIdentification),
    with: {
      station: true,
    },
  });

  return response;
};

export { getFiretruck };
