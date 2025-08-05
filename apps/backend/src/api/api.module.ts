import { Module } from '@nestjs/common';

import { MeApiModule } from './me/me.api.module';

import { FiretrucksApiModule } from './firetrucks/firetrucks.api.module';
import { IncidentsApiModule } from './incidents/incidents.api.module';
import { StationsApiModule } from './stations/stations.api.module';

@Module({
  imports: [
    FiretrucksApiModule,
    IncidentsApiModule,
    MeApiModule,
    StationsApiModule,
  ],
})
export class ApiModule {}
