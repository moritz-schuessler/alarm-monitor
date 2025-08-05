import { Module } from '@nestjs/common';
import { FiretrucksService } from './firetrucks.service';
import { FiretrucksRepository } from './firetrucks.repository';

import { CrewsModule } from '../crews/crews.module';
import { FirefightersModule } from '../firefighters/firefighters.module';
import { DatabaseModule } from 'src/data/database/database.module';

@Module({
  imports: [DatabaseModule, CrewsModule, FirefightersModule],
  providers: [FiretrucksRepository, FiretrucksService],
  exports: [FiretrucksRepository, FiretrucksService],
})
export class FiretrucksModule {}
