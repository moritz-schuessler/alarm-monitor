import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FiretrucksService } from 'src/firetrucks/firetrucks.service';

interface Payload {
  sub: string;
  firertuckId: string;
  stationId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly firetrucksService: FiretrucksService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(radioIdentification: string) {
    const firetruck =
      await this.firetrucksService.getFiretruckByRadioIdentification(
        radioIdentification,
      );

    if (!firetruck) {
      throw new NotFoundException();
    }

    const payload: Payload = {
      sub: firetruck.id,
      firertuckId: firetruck.id,
      stationId: firetruck.stationId,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
