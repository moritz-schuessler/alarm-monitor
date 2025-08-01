import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FiretrucksModule } from 'src/firetrucks/firetrucks.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
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
  providers: [AuthService],
})
export class AuthModule {}
