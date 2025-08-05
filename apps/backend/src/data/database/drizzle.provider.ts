import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@libsql/client';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';

import * as schema from 'src/data/shared/schema';

export const DRIZZLE_PROVIDER = 'DRIZZLE_PROVIDER';

export const InjectDb = () => Inject(DRIZZLE_PROVIDER);

const drizzleProvider = {
  provide: DRIZZLE_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const client = createClient({
      url: configService.getOrThrow('DATABASE_URL'),
      concurrency: 20,
    });

    return drizzle(client, { schema });
  },
  inject: [ConfigService],
};

type Database = LibSQLDatabase<typeof schema>;

export { drizzleProvider };
export { type Database };
