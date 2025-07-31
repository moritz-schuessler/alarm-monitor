import stationRepository from "./station.repository.js";

const stationService = {
  async getStations() {
    return stationRepository.findAll();
  },

  async getStationById(stationId: string) {
    return stationRepository.findById(stationId);
  },
};

export default stationService;
