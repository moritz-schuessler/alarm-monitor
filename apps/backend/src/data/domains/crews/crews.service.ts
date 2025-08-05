import { Injectable, NotFoundException } from '@nestjs/common';
import { CrewsRepository } from './crews.repository';

@Injectable()
export class CrewsService {
  constructor(private readonly crewsRepository: CrewsRepository) {}

  async getByFiretruckId(firetruckId: string) {
    const crew = await this.crewsRepository.findByFiretruckId(firetruckId);

    if (!crew) {
      throw new NotFoundException(`Firetruck ${firetruckId} not found`);
    }

    return crew;
  }

  async lock(crewId: string) {
    await this.crewsRepository.lock(crewId);
  }
}
