import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FiretrucksService } from 'src/data/domains/firetrucks/firetrucks.service';

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

  @Post(':firetruckId/firefighter')
  async addFirefighterToFiretruck(
    @Param('firetruckId') firetruckId: string,
    @Body() { firefighterId }: { firefighterId: string },
  ) {
    return await this.firetrucksService.addFirefighterToFiretruck(
      firetruckId,
      firefighterId,
    );
  }

  @Delete(':firetruckId/crew/:firefighterId')
  async removeFirefighterFromFiretruck(
    @Param('firetruckId') firetruckId: string,
    @Param('firefighterId') firefighterId: string,
  ) {
    return await this.firetrucksService.removeFirefighterFromFiretruck(
      firetruckId,
      firefighterId,
    );
  }

  @Patch(':firetruckId/crew')
  async updateCrewLocked(
    @Param('firetruckId') firetruckId: string,
    @Body() { locked }: { locked?: boolean },
  ) {
    if (locked !== undefined) {
      await this.firetrucksService.updateCrewLocked(firetruckId, locked);
    }
  }
}
