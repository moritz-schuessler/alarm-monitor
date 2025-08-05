import { Module } from '@nestjs/common';

import { MeModule } from './me/me.module';
import { FirefightersModule } from './firefighters/firefighters.module';
import { FiretrucksModule } from './firetrucks/firetrucks.module';
import { IncidentsModule } from './incidents/incidents.module';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [
    StationsModule,
    IncidentsModule,
    FiretrucksModule,
    FirefightersModule,
    MeModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
