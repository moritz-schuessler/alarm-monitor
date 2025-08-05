import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StationsRepository } from './stations.repository';
import { IncidentsService } from '../incidents/incidents.service';

@Injectable()
export class StationsService {
  constructor(
    private readonly stationsRepository: StationsRepository,
    @Inject(forwardRef(() => IncidentsService))
    private readonly incidentsService: IncidentsService,
  ) {}

  async getStationById(stationId: string) {
    const station = await this.stationsRepository.findById(stationId);

    if (!station) {
      throw new NotFoundException(
        `Firetruck with stationId ${stationId} not found`,
      );
    }

    return station;
  }

  async getStations() {
    return this.stationsRepository.findAll();
  }

  getStationsByIncident(incidentId: string) {
    return this.stationsRepository.findByIncident(incidentId);
  }

  async getIncidentsForStation(stationId: string) {
    return this.incidentsService.getIncidentsFromStation(stationId);
  }
}
