import db from "@/data/database";
import { firefighters } from "@/data/shared/schema";
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
