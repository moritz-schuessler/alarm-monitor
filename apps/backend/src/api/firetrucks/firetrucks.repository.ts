import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, InjectDb } from 'src/data/database/drizzle.provider';
import { firetrucks } from 'src/data/database/schema';

@Injectable()
export class FiretrucksRepository {
  constructor(@InjectDb() private readonly database: Database) {}

  async findById(firetruckId: string) {
    return await this.database.query.firetrucks.findFirst({
      with: {
        crew: {
          with: {
            firefighters: {
              with: {
                qualificationToFirefighter: { with: { qualification: true } },
              },
            },
          },
        },
      },
      where: (firetruck, { eq }) => eq(firetruck.id, firetruckId),
    });
  }

  async findByRadioIdentification(radioIdentification: string) {
    return await this.database.query.firetrucks.findFirst({
      where: (firetrucks, { eq }) =>
        eq(firetrucks.radioIdentification, radioIdentification),
      with: {
        crew: {
          with: {
            firefighters: {
              with: {
                qualificationToFirefighter: { with: { qualification: true } },
              },
            },
          },
        },
      },
    });
  }

  async findByIncident(incidentId: string) {
    return await this.database.query.firetrucks.findMany({
      with: {
        crew: {
          with: {
            firefighters: {
              with: {
                qualificationToFirefighter: { with: { qualification: true } },
              },
            },
          },
        },
      },
      where: (firetrucks, { eq }) => eq(firetrucks.activeIncident, incidentId),
    });
  }

  async assignToIncident(firetruckId: string, incidentId: string) {
    const [updatedFiretruck] = await this.database
      .update(firetrucks)
      .set({ activeIncident: incidentId })
      .where(eq(firetrucks.id, firetruckId))
      .returning();

    return updatedFiretruck;
  }
}
