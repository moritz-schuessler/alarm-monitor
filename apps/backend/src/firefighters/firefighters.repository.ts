import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, InjectDb } from 'src/database/drizzle.provider';
import { firefighters } from 'src/database/schema';

@Injectable()
export class FirefightersRepository {
  constructor(@InjectDb() private readonly database: Database) {}

  async addToFiretruck(firefighterId: string, crewId: string) {
    const [firefighter] = await this.database
      .update(firefighters)
      .set({ crewId: crewId })
      .where(eq(firefighters.id, firefighterId))
      .returning();

    return firefighter;
  }
}
