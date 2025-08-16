import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, InjectDb } from 'src/data/database/drizzle.provider';
import { incidents, incidentsToStations } from 'src/data/shared/schema';

@Injectable()
export class IncidentsRepository {
  constructor(
    @InjectDb()
    private readonly database: Database,
  ) {}

  async find() {
    return await this.database.query.incidents.findMany({
      with: {
        incidentsToStations: {
          with: { station: true },
        },
      },
    });
  }

  async findById(incidentId: string) {
    return await this.database.query.incidents.findFirst({
      where: (incident, { eq }) => eq(incident.id, incidentId),
    });
  }

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

  async assignStation(incidentId: string, stationId: string) {
    return await this.database
      .insert(incidentsToStations)
      .values({ incidentId, stationId });
  }
}
