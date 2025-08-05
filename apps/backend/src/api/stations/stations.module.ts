import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { StationsRepository } from './stations.repository';
import { IncidentsModule } from '../incidents/incidents.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => IncidentsModule)],
  controllers: [StationsController],
  providers: [StationsRepository, StationsService],
  exports: [StationsRepository, StationsService],
})
export class StationsModule {}
