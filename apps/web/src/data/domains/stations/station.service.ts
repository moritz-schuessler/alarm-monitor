import stationRepository from "./station.repository";

const stationService = {
  async getStations() {
    return stationRepository.findAll();
  },

  async getStationById(stationId: string) {
    return stationRepository.findById(stationId);
  },
};

export default stationService;
