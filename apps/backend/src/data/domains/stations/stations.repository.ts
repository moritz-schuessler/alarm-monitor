import { Injectable } from '@nestjs/common';
import { Database, InjectDb } from 'src/data/database/drizzle.provider';

@Injectable()
export class StationsRepository {
  constructor(
    @InjectDb()
    private readonly database: Database,
  ) {}

  async findAll() {
    return await this.database.query.stations.findMany({
      with: {
        firetrucks: true,
      },
    });
  }

  async findById(stationId: string) {
    return await this.database.query.stations.findFirst({
      with: { firetrucks: true, firefighters: true },
      where: (stations, { eq }) => eq(stations.id, stationId),
    });
  }

  async findByIncident(incidentId: string) {
    const incidentsToStations =
      await this.database.query.incidentsToStations.findMany({
        with: {
          station: {
            with: {
              firetrucks: {
                where: (firetrucks, { eq }) =>
                  eq(firetrucks.activeIncident, incidentId),
              },
            },
          },
        },
        where: (incidentsToStations, { eq }) =>
          eq(incidentsToStations.incidentId, incidentId),
      });

    return incidentsToStations.map(
      (incidentToStations) => incidentToStations.station,
    );
  }
}
