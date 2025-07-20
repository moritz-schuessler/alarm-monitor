import db from "@/data/database";
import { firetrucks } from "@/data/shared/schema";
import { eq } from "drizzle-orm";

const firetruckRepository = {
  async findById(firetruckId: string) {
    return await db.query.firetrucks.findFirst({
      where: (firetruck, { eq }) => eq(firetruck.id, firetruckId),
    });
  },

  async findByIncident(incidentId: string) {
    return await db.query.firetrucks.findMany({
      with: {
        crew: {
          with: {
            firefighters: {
              with: {
                qualificationToFirefighter: { with: { qualification: true } },
              },
            },
          },
        },
      },
      where: (firetrucks, { eq }) => eq(firetrucks.activeIncident, incidentId),
    });
  },

  async findByRadioIdentification(radioIdentification: string) {
    return await db.query.firetrucks.findFirst({
      where: (firetrucks, { eq }) =>
        eq(firetrucks.radioIdentification, radioIdentification),
      with: {
        station: true,
      },
    });
  },

  async assignToIncident(firetruckId: string, incidentId: string) {
    await db
      .update(firetrucks)
      .set({ activeIncident: incidentId })
      .where(eq(firetrucks.id, firetruckId));
  },
};

export default firetruckRepository;
