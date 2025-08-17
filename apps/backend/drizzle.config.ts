import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/data/shared/schema',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
