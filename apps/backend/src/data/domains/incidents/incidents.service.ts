import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IncidentsRepository } from './incidents.repository';
import { StationsService } from '../stations/stations.service';
import { FiretrucksService } from 'src/data/domains/firetrucks/firetrucks.service';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly incidentsRepository: IncidentsRepository,
    private readonly firetrucksService: FiretrucksService,
    @Inject(forwardRef(() => StationsService))
    private readonly stationsService: StationsService,
  ) {}

  async getIncidents() {
    return await this.incidentsRepository.find();
  }

  async createIncident(keyword: string, adress: string) {
    return await this.incidentsRepository.create(keyword, adress);
  }

  async getIncidentDetails(incidentId: string) {
    const incident = await this.incidentsRepository.findById(incidentId);
    if (!incident) {
      throw new NotFoundException(`Incident ${incidentId} not found`);
    }

    const [firetrucks, stations] = await Promise.all([
      this.firetrucksService.getByIncident(incidentId),
      this.stationsService.getStationsByIncident(incidentId),
    ]);

    return {
      incident,
      stations,
      firetrucks,
    };
  }

  async assignStation(incidentId: string, stationId: string) {
    return this.incidentsRepository.assignStation(incidentId, stationId);
  }

  async removeStation(incidentId: string, stationId: string) {
    return this.incidentsRepository.removeStation(incidentId, stationId);
  }

  async getIncidentsFromStation(stationId: string) {
    return this.incidentsRepository.findByStationId(stationId);
  }
}
