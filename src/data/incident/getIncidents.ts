import db from "..";
import { Incidents, IncidentsToStations } from "./schema";

interface IncidentFromStation extends Incidents {
  incidentsToStations: IncidentsToStations;
}

const getIncidentsFromStation = async (stationId: string) => {
  return await db.query.incidents.findMany({
    with: {
      incidentsToStations: {
        where: (incidentsToStations, { eq }) =>
          eq(incidentsToStations.stationId, stationId),
      },
    },
  });
};

export { getIncidentsFromStation };
export { type IncidentFromStation };
