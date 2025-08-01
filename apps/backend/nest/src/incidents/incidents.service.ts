import { Injectable } from '@nestjs/common';
import { IncidentsRepository } from './incidents.repository';

@Injectable()
export class IncidentsService {
  constructor(private readonly incidentsRepository: IncidentsRepository) {}

  async getIncidentsFromStation(stationId: string) {
    return this.incidentsRepository.findByStationId(stationId);
  }
}
