import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, InjectDb } from 'src/database/drizzle.provider';
import { incidents, incidentsToStations } from 'src/database/schema';

@Injectable()
export class IncidentsRepository {
  constructor(
    @InjectDb()
    private readonly database: Database,
  ) {}

  async findByStationId(stationId: string) {
    const result = await this.database
      .select()
      .from(incidents)
      .innerJoin(
        incidentsToStations,
        eq(incidents.id, incidentsToStations.incidentId),
      )
      .where(eq(incidentsToStations.stationId, stationId));

    return result.map((row) => row.incidents);
  }
}
