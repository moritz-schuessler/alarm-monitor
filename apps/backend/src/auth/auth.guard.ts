import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionPayload, SessionService } from './session.service';

export interface ExtendedRequest extends Request {
  cookies: Record<string, string>;
  session?: SessionPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    const token = request.cookies?.session;

    if (!token) {
      throw new UnauthorizedException('No session token');
    }

    const session = await this.sessionService.decrypt(token);

    if (!session) {
      throw new UnauthorizedException('Invalid session token');
    }

    request.session = session;
    return true;
  }
}
