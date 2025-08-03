import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { IncidentsService } from './incidents.service';
import { IncidentsRepository } from './incidents.repository';
import { FiretrucksModule } from 'src/firetrucks/firetrucks.module';
import { StationsModule } from 'src/stations/stations.module';
import { IncidentsController } from './incidents.controller';

@Module({
  imports: [DatabaseModule, FiretrucksModule, forwardRef(() => StationsModule)],
  controllers: [IncidentsController],
  providers: [IncidentsRepository, IncidentsService],
  exports: [IncidentsRepository, IncidentsService],
})
export class IncidentsModule {}
