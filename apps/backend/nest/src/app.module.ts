import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StationsModule } from './stations/stations.module';
import { IncidentsService } from './incidents/incidents.service';
import { IncidentsModule } from './incidents/incidents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    DatabaseModule,
    StationsModule,
    IncidentsModule,
  ],
  controllers: [],
  providers: [IncidentsService],
})
export class AppModule {}
