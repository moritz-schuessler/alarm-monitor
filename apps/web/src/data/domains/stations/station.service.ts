import stationRepository from "./station.repository";

const stationService = {
  async getStations() {
    return stationRepository.findAll();
  },
};

export default stationService;
