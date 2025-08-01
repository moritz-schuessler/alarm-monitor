import { Injectable, NotFoundException } from '@nestjs/common';
import { FirefightersRepository } from './firefighters.repository';

@Injectable()
export class FirefightersService {
  constructor(
    private readonly firefightersRepository: FirefightersRepository,
  ) {}

  async assignToCrew(firefighterId: string, crewId: string) {
    const firefighter = await this.firefightersRepository.addToFiretruck(
      firefighterId,
      crewId,
    );

    if (!firefighter) {
      throw new NotFoundException(`Firefighter ${firefighterId} not found`);
    }

    return firefighter;
  }
}
