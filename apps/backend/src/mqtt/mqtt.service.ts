import { Injectable } from '@nestjs/common';
import { FirefightersService } from 'src/firefighters/firefighters.service';
import { FiretrucksService } from 'src/firetrucks/firetrucks.service';

@Injectable()
export class MQTTService {
  constructor(
    private readonly firetruckService: FiretrucksService,
    private readonly firefightersService: FirefightersService,
  ) {}

  async updateCrewForFiretruck(radioIdentification: string, crew: string[]) {
    const crewWithDashes = crew.map((beaconId) => addDashesToUuid(beaconId));

    const firetruck =
      await this.firetruckService.getFiretruckByRadioIdentification(
        radioIdentification,
      );

    const firefighters = await Promise.all(
      crewWithDashes.map((beaconId) => {
        try {
          return this.firefightersService.getByBeaconId(beaconId);
        } catch (/* eslint-disable-line @typescript-eslint/no-unused-vars */ e) {
          return null;
        }
      }),
    );

    const currentCrewIds = firetruck.crew!.firefighters.map((f) => f.id);

    const newToCrew = firefighters
      .filter((firefighter) => !!firefighter)
      .filter((firefighter) => !currentCrewIds.includes(firefighter.id));

    newToCrew.forEach((firefighter) => {
      void this.firefightersService.assignToCrew(
        firefighter.id,
        firetruck.crew!.id,
      );
    });
  }
}

function addDashesToUuid(uuid: string): string {
  // Erwartet: 32 Zeichen, z.B. '123e4567e89b12d3a456426614174000'
  return uuid.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}
