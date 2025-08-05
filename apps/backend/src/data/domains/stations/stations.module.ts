import { forwardRef, Module } from '@nestjs/common';

import { StationsService } from './stations.service';
import { StationsRepository } from './stations.repository';
import { IncidentsModule } from '../incidents/incidents.module';
import { DatabaseModule } from 'src/data/database/database.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => IncidentsModule)],
  providers: [StationsRepository, StationsService],
  exports: [StationsRepository, StationsService],
})
export class StationsModule {}
