import { Injectable, NotFoundException } from '@nestjs/common';
import { FiretrucksRepository } from './firetrucks.repository';

@Injectable()
export class FiretrucksService {
  constructor(private readonly firetrucksRepository: FiretrucksRepository) {}

  async getById(firetruckId: string) {
    const firetruck = await this.firetrucksRepository.findById(firetruckId);

    if (!firetruck) {
      throw new NotFoundException(`Firetruck ${firetruckId} not found`);
    }

    return firetruck;
  }

  async getFiretruckByRadioIdentification(radioIdentification: string) {
    const firetruck =
      await this.firetrucksRepository.findByRadioIdentification(
        radioIdentification,
      );

    if (!firetruck) {
      throw new NotFoundException(
        `Firetruck with radioIdentification ${radioIdentification} not found`,
      );
    }

    return firetruck;
  }

  async getByIncident(incidentId: string) {
    return await this.firetrucksRepository.findByIncident(incidentId);
  }

  async assignToIncident(firetruckId: string, incidentId: string) {
    const firetruck = await this.firetrucksRepository.assignToIncident(
      firetruckId,
      incidentId,
    );

    if (!firetruck) {
      throw new NotFoundException(`Firetruck ${firetruckId} not found`);
    }

    return firetruck;
  }
}
