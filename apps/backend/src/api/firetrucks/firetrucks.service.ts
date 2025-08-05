import { Injectable, NotFoundException } from '@nestjs/common';
import { FiretrucksRepository } from './firetrucks.repository';
import { FirefightersService } from '../firefighters/firefighters.service';
import { CrewsService } from 'src/data/domains/crews/crews.service';

@Injectable()
export class FiretrucksService {
  constructor(
    private readonly firetrucksRepository: FiretrucksRepository,
    private readonly crewsService: CrewsService,
    private readonly firefighterService: FirefightersService,
  ) {}

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

  async addFirefighterToFiretruck(firetruckId: string, firefighterId: string) {
    const crew = await this.crewsService.getByFiretruckId(firetruckId);

    if (!crew) {
      throw new NotFoundException(
        `Crew for firetruck ${firetruckId} not found`,
      );
    }

    const firetruck = await this.firefighterService.assignToCrew(
      firefighterId,
      crew.id,
    );

    if (!crew.isLocked && firetruck) {
      await this.crewsService.lock(crew.id);
    }
  }
}
