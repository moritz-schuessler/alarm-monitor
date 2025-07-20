import firetruckRepository from "./firetruck.repository";

const firetruckService = {
  async getFiretruckById(firetruckId: string) {
    return await firetruckRepository.findById(firetruckId);
  },
  async getFiretruckByRadioIdentification(radioIdentification: string) {
    return await firetruckRepository.findByRadioIdentification(
      radioIdentification,
    );
  },
};

export default firetruckService;
