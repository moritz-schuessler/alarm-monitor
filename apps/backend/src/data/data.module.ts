import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { CrewsModule } from './domains/crews/crews.module';

@Module({
  imports: [DatabaseModule, CrewsModule],
})
export class DataModule {}
