import db from "../../database";

const getIncidentById = async (incidentId: string) => {
  const incident = await db.query.incidents.findFirst({
    where: (incident, { eq }) => eq(incident.id, incidentId),
  });

  const firetrucks = await db.query.firetrucks.findMany({
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

  const stations = incidentsToStations.map((incidentsToStations) => {
    return incidentsToStations.station;
  });

  return {
    incident,
    stations,
    firetrucks,
  };
};

export { getIncidentById };
