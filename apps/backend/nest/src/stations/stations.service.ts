import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { StationsRepository } from './stations.repository';
import { IncidentsService } from 'src/incidents/incidents.service';

@Injectable()
export class StationsService {
  constructor(
    private readonly stationsRepository: StationsRepository,
    @Inject(forwardRef(() => IncidentsService))
    private readonly incidentsService: IncidentsService,
  ) {}

  async getStations() {
    return this.stationsRepository.findAll();
  }

  async getStationById(stationId: string) {
    return this.stationsRepository.findById(stationId);
  }

  getStationsByIncident(incidentId: string) {
    return this.stationsRepository.findByIncident(incidentId);
  }

  async getIncidentsForStation(stationId: string) {
    return this.incidentsService.getIncidentsFromStation(stationId);
  }
}
