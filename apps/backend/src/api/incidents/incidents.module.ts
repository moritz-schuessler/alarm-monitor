import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/data/database/database.module';
import { IncidentsService } from './incidents.service';
import { IncidentsRepository } from './incidents.repository';

import { IncidentsController } from './incidents.controller';
import { FiretrucksModule } from '../firetrucks/firetrucks.module';
import { StationsModule } from '../stations/stations.module';

@Module({
  imports: [DatabaseModule, FiretrucksModule, forwardRef(() => StationsModule)],
  controllers: [IncidentsController],
  providers: [IncidentsRepository, IncidentsService],
  exports: [IncidentsRepository, IncidentsService],
})
export class IncidentsModule {}
