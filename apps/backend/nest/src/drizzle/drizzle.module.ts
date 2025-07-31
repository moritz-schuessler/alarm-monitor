import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schema from './schema/index';

export const DRIZZLE_PROVIDER = 'DRIZZLE_PROVIDER';

@Module({
  providers: [
    {
      provide: DRIZZLE_PROVIDER,
      useFactory: (configService: ConfigService) => {
        const client = createClient({
          url: configService.getOrThrow('DATABASE_URL'),
          concurrency: 20,
        });

        return drizzle(client, { schema });
      },
      inject: [ConfigService],
    },
  ],
})
export class DrizzleModule {}
