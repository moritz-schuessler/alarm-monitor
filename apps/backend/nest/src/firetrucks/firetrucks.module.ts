import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FiretrucksService } from './firetrucks.service';
import { FiretrucksRepository } from './firetrucks.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [FiretrucksRepository, FiretrucksService],
  exports: [FiretrucksRepository, FiretrucksService],
})
export class FiretrucksModule {}
