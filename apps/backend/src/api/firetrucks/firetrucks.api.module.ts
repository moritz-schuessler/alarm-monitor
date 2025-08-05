import { Module } from '@nestjs/common';

import { FiretrucksController } from 'src/api/firetrucks/firetrucks.controller';
import { FiretrucksModule } from 'src/data/domains/firetrucks/firetrucks.module';

@Module({
  imports: [FiretrucksModule],
  controllers: [FiretrucksController],
})
export class FiretrucksApiModule {}
