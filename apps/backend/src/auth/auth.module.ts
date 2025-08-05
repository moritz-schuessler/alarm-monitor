import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionService } from './session.service';
import { FiretrucksModule } from 'src/api/firetrucks/firetrucks.module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow('AUTH_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    FiretrucksModule,
  ],
  controllers: [AuthController],
  providers: [SessionService, AuthService],
  exports: [SessionService],
})
export class AuthModule {}
