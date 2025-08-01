import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async signIn(
    @Body() { radioIdentification }: { radioIdentification: string },
  ) {
    return await this.authService.signIn(radioIdentification);
  }
}
