import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { IncidentsService } from './incidents.service';
import { IncidentsRepository } from './incidents.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [IncidentsRepository, IncidentsService],
  exports: [IncidentsRepository, IncidentsService],
})
export class IncidentsModule {}
