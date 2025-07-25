import db from "@/data/database";

const crewRepository = {
  async findByFiretruckId(firetruckId: string) {
    return db.query.crews.findFirst({
      where: (crews, { eq }) => eq(crews.firetruckId, firetruckId),
    });
  },
};

export default crewRepository;
