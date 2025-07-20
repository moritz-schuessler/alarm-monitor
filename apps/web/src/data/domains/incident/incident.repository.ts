import db from "@/data/database";
import {
  firetrucks,
  incidents,
  incidentsToStations,
} from "@/data/shared/schema";
import { eq } from "drizzle-orm";

const incidentRepository = {
  async findById(incidentId: string) {
    return await db.query.incidents.findFirst({
      where: (incident, { eq }) => eq(incident.id, incidentId),
    });
  },

  async findByStationId(stationId: string) {
    return await db
      .select()
      .from(incidents)
      .innerJoin(
        incidentsToStations,
        eq(incidents.id, incidentsToStations.incidentId),
      )
      .where(eq(incidentsToStations.stationId, stationId));
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

export default incidentRepository;
