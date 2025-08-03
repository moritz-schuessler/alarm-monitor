import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { IncidentsModule } from 'src/incidents/incidents.module';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { StationsRepository } from './stations.repository';

@Module({
  imports: [DatabaseModule, forwardRef(() => IncidentsModule)],
  controllers: [StationsController],
  providers: [StationsRepository, StationsService],
  exports: [StationsRepository, StationsService],
})
export class StationsModule {}
