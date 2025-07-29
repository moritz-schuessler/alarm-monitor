import crewRepository from "../crews/crew.repository.js";
import firefighterRepository from "../firefighters/firefighter.repository.js";
import firetruckRepository from "./firetruck.repository.js";

const firetruckService = {
  async getFiretruckById(firetruckId: string) {
    return await firetruckRepository.findById(firetruckId);
  },

  async getFiretruckByRadioIdentification(radioIdentification: string) {
    return await firetruckRepository.findByRadioIdentification(
      radioIdentification,
    );
  },

  async addFirefighterToFiretruck(firetruckId: string, firefighterId: string) {
    const crew = await crewRepository.findByFiretruckId(firetruckId);

    firefighterRepository.addToFiretruck(firefighterId, crew!.id);
    crewRepository.lock(crew!.id);
  },
};

export default firetruckService;
