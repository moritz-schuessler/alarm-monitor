import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
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

  async create(keyword: string, adress: string) {
    return this.database.insert(incidents).values({
      keyword,
      alarmTime: sql`datetime('now', 'localtime')`,
      adress,
    });
  }

  async delete(incidentId: string) {
    return this.database.delete(incidents).where(eq(incidents.id, incidentId));
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

  async removeStation(incidentId: string, stationId: string) {
    return await this.database
      .delete(incidentsToStations)
      .where(
        and(
          eq(incidentsToStations.incidentId, incidentId),
          eq(incidentsToStations.stationId, stationId),
        ),
      );
  }
}
