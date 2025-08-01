import { Module } from '@nestjs/common';
import { FirefightersService } from './firefighters.service';
import { FirefightersRepository } from './firefighters.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [FirefightersRepository, FirefightersService],
  exports: [FirefightersRepository, FirefightersService],
})
export class FirefightersModule {}
