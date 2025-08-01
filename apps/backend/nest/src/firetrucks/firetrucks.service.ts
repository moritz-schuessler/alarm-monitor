import { Injectable, NotFoundException } from '@nestjs/common';
import { FiretrucksRepository } from './firetrucks.repository';

@Injectable()
export class FiretrucksService {
  constructor(private readonly firetrucksRepository: FiretrucksRepository) {}

  async getById(firetruckId: string) {
    return await this.firetrucksRepository.findById(firetruckId);
  }

  async getFiretruckByRadioIdentification(radioIdentification: string) {
    return await this.firetrucksRepository.findByRadioIdentification(
      radioIdentification,
    );
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
