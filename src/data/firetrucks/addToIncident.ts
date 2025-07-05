import { eq } from "drizzle-orm";
import db from "..";
import { firetrucks } from "./schema";

const addToIncident = async (firetruckId: string, incidentId: string) => {
  await db
    .update(firetrucks)
    .set({ activeIncident: incidentId })
    .where(eq(firetrucks.id, firetruckId));
};

export default addToIncident;
