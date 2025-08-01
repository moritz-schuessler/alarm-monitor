import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FiretrucksService } from './firetrucks.service';
import { FiretrucksRepository } from './firetrucks.repository';
import { CrewsModule } from 'src/crews/crews.module';
import { FirefightersModule } from 'src/firefighters/firefighters.module';

@Module({
  imports: [DatabaseModule, CrewsModule, FirefightersModule],
  providers: [FiretrucksRepository, FiretrucksService],
  exports: [FiretrucksRepository, FiretrucksService],
})
export class FiretrucksModule {}
