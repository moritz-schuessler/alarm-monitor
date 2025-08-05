import { Module } from '@nestjs/common';
import { CrewsService } from './crews.service';
import { CrewsRepository } from './crews.repository';
import { DatabaseModule } from 'src/data/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CrewsRepository, CrewsService],
  exports: [CrewsRepository, CrewsService],
})
export class CrewsModule {}
