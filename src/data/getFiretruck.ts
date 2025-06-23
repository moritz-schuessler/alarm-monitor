import { eq } from "drizzle-orm";
import db from "./index";
import { Firetruck, firetruckTable } from "./schema";
import { log } from "console";

const getFiretruck = async (radioIdentification: string) => {
  const response = await db.query.firetrucks.findFirst({
    where: (firetrucks, { eq }) =>
      eq(firetrucks.radioIdentification, radioIdentification),
  });

  log("fireteruck", radioIdentification);

  return response;
};

export { getFiretruck };
