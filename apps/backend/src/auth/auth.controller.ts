import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(
    @Body() { radioIdentification }: { radioIdentification: string },
  ) {
    return await this.authService.signIn(radioIdentification);
  }
}
