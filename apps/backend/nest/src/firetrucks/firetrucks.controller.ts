import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FiretrucksService } from './firetrucks.service';

@Controller('firetrucks')
export class FiretrucksController {
  constructor(private readonly firetrucksService: FiretrucksService) {}

  @Get(':firetruckId')
  async find(@Param('firetruckId') firetruckId: string) {
    return await this.firetrucksService.getById(firetruckId);
  }

  @Post(':firetruckId/incident')
  async assignToIncident(
    @Param('firetruckId') firetruckId: string,
    @Body() { incidentId }: { incidentId: string },
  ) {
    return await this.firetrucksService.assignToIncident(
      firetruckId,
      incidentId,
    );
  }

  @Post(':firetruckId/firefighters')
  async addFirefighterToFiretruck(
    @Param('firetruckId') firetruckId: string,
    @Body() { firefighterId }: { firefighterId: string },
  ) {
    return await this.firetrucksService.addFirefighterToFiretruck(
      firetruckId,
      firefighterId,
    );
  }
}
