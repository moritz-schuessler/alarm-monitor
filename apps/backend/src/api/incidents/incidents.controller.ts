import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IncidentsService } from 'src/data/domains/incidents/incidents.service';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get()
  async findAllIncidents() {
    return await this.incidentsService.getIncidents();
  }

  @Post()
  async createStation(
    @Body() { keyword, adress }: { keyword: string; adress: string },
  ) {
    return await this.incidentsService.createIncident(keyword, adress);
  }

  @Get(':incidentId')
  async findByIncidentId(@Param('incidentId') incidentId: string) {
    return await this.incidentsService.getIncidentDetails(incidentId);
  }

  @Post(':incidentId/stations')
  async assignStation(
    @Param('incidentId') incidentId: string,
    @Body() { stationId }: { stationId: string },
  ) {
    return await this.incidentsService.assignStation(incidentId, stationId);
  }

  @Delete(':incidentId/stations/:stationId')
  async removeStation(
    @Param('incidentId') incidentId: string,
    @Param('stationId') stationId: string,
  ) {
    return await this.incidentsService.removeStation(incidentId, stationId);
  }
}
