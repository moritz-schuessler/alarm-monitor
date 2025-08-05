import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';

import { AuthModule } from 'src/auth/auth.module';
import { FiretrucksModule } from '../firetrucks/firetrucks.module';
import { StationsModule } from '../stations/stations.module';

@Module({
  imports: [AuthModule, FiretrucksModule, StationsModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
