import db from "../../database/index.js";
import { firefighters } from "../../shared/schema/firefighters.js";
import { eq } from "drizzle-orm";

const firefighterRepository = {
  async addToFiretruck(firefighterId: string, crewId: string) {
    await db
      .update(firefighters)
      .set({ crewId: crewId })
      .where(eq(firefighters.id, firefighterId));
  },
};

export default firefighterRepository;
