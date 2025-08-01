// src/auth/session.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface SessionPayload {
  sub: string;
  firetruckId: string;
  stationId: string;
}

@Injectable()
export class SessionService {
  constructor(private readonly jwtService: JwtService) {}

  async encrypt(payload: SessionPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async decrypt(token: string): Promise<SessionPayload | null> {
    try {
      return await this.jwtService.verifyAsync<SessionPayload>(token);
    } catch {
      return null;
    }
  }
}

export { type SessionPayload };
