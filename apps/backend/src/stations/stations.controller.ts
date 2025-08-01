import { Controller, Get, Param } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  findAll() {
    return this.stationsService.getStations();
  }

  @Get(':stationId/incidents')
  findIncidentsByStationId(@Param('stationId') stationId: string) {
    return this.stationsService.getIncidentsForStation(stationId);
  }
}
