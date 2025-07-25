import db from "@/data/database";
import { crews } from "@/data/shared/schema";
import { eq } from "drizzle-orm";

const crewRepository = {
  async findByFiretruckId(firetruckId: string) {
    return db.query.crews.findFirst({
      where: (crews, { eq }) => eq(crews.firetruckId, firetruckId),
    });
  },

  async lock(crewId: string) {
    await db.update(crews).set({ isLocked: true }).where(eq(crews.id, crewId));
  },
};

export default crewRepository;
