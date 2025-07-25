import db from "@/data/database";

const stationRepository = {
  async findAll() {
    return await db.query.stations.findMany({
      with: {
        firetrucks: true,
      },
    });
  },

  async findById(stationId: string) {
    return await db.query.stations.findFirst({
      with: { firetrucks: true, firefighters: true },
      where: (stations, { eq }) => eq(stations.id, stationId),
    });
  },

  async findByIncident(incidentId: string) {
    const incidentsToStations = await db.query.incidentsToStations.findMany({
      with: {
        station: {
          with: {
            firetrucks: {
              where: (firetrucks, { eq }) =>
                eq(firetrucks.activeIncident, incidentId),
            },
          },
        },
      },
      where: (incidentsToStations, { eq }) =>
        eq(incidentsToStations.incidentId, incidentId),
    });

    return incidentsToStations.map((incidentsToStations) => {
      return incidentsToStations.station;
    });
  },
};

export default stationRepository;
