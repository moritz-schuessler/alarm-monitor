import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { FiretrucksModule } from 'src/firetrucks/firetrucks.module';
import { StationsModule } from 'src/stations/stations.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, FiretrucksModule, StationsModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
