import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
