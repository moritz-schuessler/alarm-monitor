import { Module } from '@nestjs/common';

import { IncidentsController } from './incidents.controller';
import { IncidentsModule } from 'src/data/domains/incidents/incidents.module';

@Module({
  imports: [IncidentsModule],
  controllers: [IncidentsController],
})
export class IncidentsApiModule {}
