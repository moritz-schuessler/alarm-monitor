import { eq } from "drizzle-orm";
import db from "..";
import {
  incidents,
  Incidents,
  incidentsToStations,
  IncidentsToStations,
} from "./schema";

interface IncidentFromStation extends Incidents {
  incidentsToStations: IncidentsToStations;
}

const getIncidentsFromStation = async (stationId: string) => {
  return await db
    .select()
    .from(incidents)
    .innerJoin(
      incidentsToStations,
      eq(incidents.id, incidentsToStations.incidentId),
    )
    .where(eq(incidentsToStations.stationId, stationId));
};

export { getIncidentsFromStation };
export { type IncidentFromStation };
