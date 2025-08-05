import { Injectable } from '@nestjs/common';
import { eq, getTableColumns } from 'drizzle-orm';
import { Database, InjectDb } from 'src/database/drizzle.provider';
import { beacons, firefighters } from 'src/database/schema';

@Injectable()
export class FirefightersRepository {
  constructor(@InjectDb() private readonly database: Database) {}

  async findByBeaconId(beaconId: string) {
    const result = await this.database
      .select({ ...getTableColumns(firefighters) })
      .from(firefighters)
      .innerJoin(beacons, eq(firefighters.id, beacons.firefighterId))
      .where(eq(beacons.id, beaconId));

    return result[0] ?? null;
  }

  async addToFiretruck(firefighterId: string, crewId: string) {
    const [firefighter] = await this.database
      .update(firefighters)
      .set({ crewId: crewId })
      .where(eq(firefighters.id, firefighterId))
      .returning();

    return firefighter;
  }

  async removeFromFiretruck(firefighterId: string) {
    const [firefighter] = await this.database
      .update(firefighters)
      .set({ crewId: null })
      .where(eq(firefighters.id, firefighterId))
      .returning();

    return firefighter;
  }
}
