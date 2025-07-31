import incidentService from "./incident.service";

type IncidentDetails = Awaited<
  ReturnType<typeof incidentService.getIncidentDetails>
>;

export { type IncidentDetails };
