import { Injectable } from '@nestjs/common';
import { FiretrucksService } from 'src/data/domains/firetrucks/firetrucks.service';
import { StationsService } from 'src/data/domains/stations/stations.service';

@Injectable()
export class MeService {
  constructor(
    private readonly firetrucksService: FiretrucksService,
    private readonly stationsService: StationsService,
  ) {}

  async getMe(firetruckId: string, stationId: string) {
    const [firetruck, station] = await Promise.all([
      this.firetrucksService.getById(firetruckId),
      this.stationsService.getStationById(stationId),
    ]);

    return { firetruck, station };
  }
}
