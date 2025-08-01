import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, InjectDb } from 'src/database/drizzle.provider';
import { crews } from 'src/database/schema';

@Injectable()
export class CrewsRepository {
  constructor(@InjectDb() private readonly database: Database) {}

  async findByFiretruckId(firetruckId: string) {
    return this.database.query.crews.findFirst({
      where: (crews, { eq }) => eq(crews.firetruckId, firetruckId),
    });
  }

  async lock(crewId: string) {
    await this.database
      .update(crews)
      .set({ isLocked: true })
      .where(eq(crews.id, crewId));
  }
}
