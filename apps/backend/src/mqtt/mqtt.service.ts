import { Injectable } from '@nestjs/common';
import { FirefightersService } from 'src/data/domains/firefighters/firefighters.service';
import { FiretrucksService } from 'src/data/domains/firetrucks/firetrucks.service';

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

    if (firetruck.crew?.isLocked) {
      return;
    }

    const firefighters = await Promise.all(
      crewWithDashes.map((beaconId) => {
        try {
          return this.firefightersService.getByBeaconId(beaconId);
        } catch (/* eslint-disable-line @typescript-eslint/no-unused-vars */ e) {
          return null;
        }
      }),
    );

    const newCrewIds = firefighters
      .filter((firefighter) => !!firefighter)
      .map((f) => f.id);
    const currentCrewIds = firetruck.crew!.firefighters.map((f) => f.id);

    const toRemove = currentCrewIds.filter((id) => !newCrewIds.includes(id));
    const toAdd = newCrewIds.filter((id) => !currentCrewIds.includes(id));

    toRemove.forEach((id) => {
      void this.firefightersService.removeFromCrew(id);
    });

    toAdd.forEach((id) => {
      void this.firefightersService.assignToCrew(id, firetruck.crew!.id);
    });
  }
}

function addDashesToUuid(uuid: string): string {
  const clean = uuid.replace(/-/g, '');
  return clean.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}
