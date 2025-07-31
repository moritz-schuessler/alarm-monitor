import { ConfigService } from '@nestjs/config';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

export const DRIZZLE_PROVIDER = 'DRIZZLE_PROVIDER';

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

export { drizzleProvider };
