import { forwardRef, Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsRepository } from './incidents.repository';

import { FiretrucksModule } from '../firetrucks/firetrucks.module';
import { StationsModule } from '../stations/stations.module';
import { DatabaseModule } from 'src/data/database/database.module';

@Module({
  imports: [DatabaseModule, FiretrucksModule, forwardRef(() => StationsModule)],
  providers: [IncidentsRepository, IncidentsService],
  exports: [IncidentsRepository, IncidentsService],
})
export class IncidentsModule {}
