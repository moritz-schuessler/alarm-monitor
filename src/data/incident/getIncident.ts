import db from "..";

const getIncidentById = async (incidentId: string) => {
  return await db.query.incidents.findFirst({
    where: (incident, { eq }) => eq(incident.id, incidentId),
  });
};

export { getIncidentById };
