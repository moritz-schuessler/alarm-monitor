import { Injectable, NotFoundException } from '@nestjs/common';
import { FirefightersRepository } from './firefighters.repository';

@Injectable()
export class FirefightersService {
  constructor(
    private readonly firefightersRepository: FirefightersRepository,
  ) {}

  async getByBeaconId(beaconId: string) {
    const firefighter =
      await this.firefightersRepository.findByBeaconId(beaconId);

    if (!firefighter) {
      throw new NotFoundException(
        `Firefighter with beaconId ${beaconId} not found`,
      );
    }

    return firefighter;
  }

  async assignToCrew(firefighterId: string, crewId: string) {
    const firefighter = await this.firefightersRepository.addToFiretruck(
      firefighterId,
      crewId,
    );

    if (!firefighter) {
      throw new NotFoundException(
        `Firefighter with firefighterId ${firefighterId} not found`,
      );
    }

    return firefighter;
  }
}
