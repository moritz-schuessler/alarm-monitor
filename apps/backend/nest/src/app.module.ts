import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { StationsModule } from './stations/stations.module';
import { IncidentsModule } from './incidents/incidents.module';
import { FiretrucksModule } from './firetrucks/firetrucks.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
