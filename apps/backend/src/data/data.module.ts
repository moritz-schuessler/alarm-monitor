import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { CrewsModule } from './domains/crews/crews.module';
import { FiretrucksModule } from './domains/firetrucks/firetrucks.module';
import { FirefightersModule } from './domains/firefighters/firefighters.module';
import { IncidentsModule } from './domains/incidents/incidents.module';
import { StationsModule } from './domains/stations/stations.module';

@Module({
  imports: [
    DatabaseModule,
    CrewsModule,
    FirefightersModule,
    FiretrucksModule,
    IncidentsModule,
    StationsModule,
  ],
  exports: [
    DatabaseModule,
    CrewsModule,
    FirefightersModule,
    FiretrucksModule,
    IncidentsModule,
    StationsModule,
  ],
})
export class DataModule {}
