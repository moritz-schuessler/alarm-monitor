import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/data/database/database.module';
import { FiretrucksService } from './firetrucks.service';
import { FiretrucksRepository } from './firetrucks.repository';
import { CrewsModule } from 'src/crews/crews.module';
import { FiretrucksController } from './firetrucks.controller';
import { FirefightersModule } from '../firefighters/firefighters.module';

@Module({
  imports: [DatabaseModule, CrewsModule, FirefightersModule],
  controllers: [FiretrucksController],
  providers: [FiretrucksRepository, FiretrucksService],
  exports: [FiretrucksRepository, FiretrucksService],
})
export class FiretrucksModule {}
