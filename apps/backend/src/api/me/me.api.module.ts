import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';

import { StationsModule } from 'src/data/domains/stations/stations.module';
import { FiretrucksModule } from 'src/data/domains/firetrucks/firetrucks.module';

@Module({
  imports: [FiretrucksModule, StationsModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeApiModule {}
