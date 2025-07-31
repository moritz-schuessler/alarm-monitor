import firetruckRepository from "../firetrucks/firetruck.repository.js";
import stationRepository from "../stations/station.repository.js";
import incidentRepository from "./incident.repository.js";

const incidentService = {
  async getIncidentsFromStation(stationId: string) {
    return await incidentRepository.findByStationId(stationId);
  },

  async getIncidentDetails(incidentId: string) {
    const incident = await incidentRepository.findById(incidentId);
    const firetrucks = await firetruckRepository.findByIncident(incidentId);
    const stations = await stationRepository.findByIncident(incidentId);

    return {
      incident,
      stations,
      firetrucks,
    };
  },

  async addFiretruckToIncident(firetruckId: string, incidentId: string) {
    await firetruckRepository.assignToIncident(firetruckId, incidentId);

    return firetruckRepository.findById(firetruckId);
  },
};

export default incidentService;
