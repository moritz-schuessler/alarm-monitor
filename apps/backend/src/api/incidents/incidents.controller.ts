import { Controller, Get, Param } from '@nestjs/common';
import { IncidentsService } from 'src/data/domains/incidents/incidents.service';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get(':incidentId')
  async findByIncidentId(@Param('incidentId') incidentId: string) {
    return await this.incidentsService.getIncidentDetails(incidentId);
  }
}
