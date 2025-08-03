import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FiretrucksService } from 'src/firetrucks/firetrucks.service';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly firetrucksService: FiretrucksService,
  ) {}

  async signIn(radioIdentification: string) {
    const firetruck =
      await this.firetrucksService.getFiretruckByRadioIdentification(
        radioIdentification,
      );

    if (!firetruck) {
      throw new NotFoundException();
    }

    return {
      access_token: await this.sessionService.encrypt({
        sub: firetruck.id,
        firetruckId: firetruck.id,
        stationId: firetruck.stationId,
      }),
    };
  }
}
