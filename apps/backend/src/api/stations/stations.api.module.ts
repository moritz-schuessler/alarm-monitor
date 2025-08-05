import { Module } from '@nestjs/common';

import { StationsController } from './stations.controller';
import { StationsModule } from 'src/data/domains/stations/stations.module';

@Module({
  imports: [StationsModule],
  controllers: [StationsController],
})
export class StationsApiModule {}
