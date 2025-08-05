import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { StationsModule } from './stations/stations.module';
import { IncidentsModule } from './incidents/incidents.module';
import { FiretrucksModule } from './firetrucks/firetrucks.module';
import { CrewsModule } from './crews/crews.module';
import { FirefightersModule } from './firefighters/firefighters.module';
import { MeModule } from './me/me.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    DatabaseModule,
    AuthModule,
    StationsModule,
    IncidentsModule,
    FiretrucksModule,
    CrewsModule,
    FirefightersModule,
    MeModule,
    MqttModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
