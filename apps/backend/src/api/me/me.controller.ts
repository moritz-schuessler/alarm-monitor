import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { AuthGuard, ExtendedRequest } from 'src/auth/auth.guard';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getMe(@Req() request: ExtendedRequest) {
    const { firetruckId, stationId } = request.session!;

    return this.meService.getMe(firetruckId, stationId);
  }
}
