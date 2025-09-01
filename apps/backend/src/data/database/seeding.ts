import { drizzle } from 'drizzle-orm/libsql';
import { fakerDE as faker } from '@faker-js/faker';

import * as schema from 'src/data/shared/schema';
import {
  departments as departmentsSchema,
  stations as stationsSchema,
  firetrucks as firetrucksSchema,
  firefighters as firefightersSchema,
  crews as crewsSchema,
  beacons as beaconsSchema,
  FiretruckEntity,
  FirefighterEntity,
} from 'src/data/shared/schema';
import seedQualifications from './seeding/qualifications';

const db = drizzle(process.env.DATABASE_URL!, { schema });

async function main() {
  await db.delete(schema.incidentsToStations);
  await db.delete(schema.incidents);
  await db.delete(schema.beacons);
  await db.delete(schema.qualificationToFirefighter);
  await db.delete(firefightersSchema);
  await db.delete(schema.crews);
  await db.delete(firetrucksSchema);
  await db.delete(stationsSchema);
  await db.delete(departmentsSchema);
  await db.delete(schema.qualifications);

  const departments = await db
    .insert(departmentsSchema)
    .values([
      { name: 'Feuerwehr Mustergemeinde' },
      { name: 'Feuerwehr Musterstadt' },
    ])
    .returning();

  const stationsMustergemeinde = await db
    .insert(stationsSchema)
    .values([
      { name: 'Mitte', departmentId: departments[0].id },
      { name: 'Süd', departmentId: departments[0].id },
      { name: 'Musterdorf', departmentId: departments[0].id },
      { name: 'Musterstadt', departmentId: departments[1].id },
    ])
    .returning();

  const firetrucksByStation: {
    [station: string]: null | FiretruckEntity[];
  } = {};

  firetrucksByStation.mitte = await db
    .insert(firetrucksSchema)
    .values([
      {
        radioIdentification: 'Mustergemeinde 1-30-1',
        stationId: stationsMustergemeinde[0].id,
        seats: 3,
      },
      {
        radioIdentification: 'Mustergemeinde 1-44-1',
        stationId: stationsMustergemeinde[0].id,
        seats: 9,
      },
      {
        radioIdentification: 'Mustergemeinde 1-11-1',
        stationId: stationsMustergemeinde[0].id,
        seats: 1,
      },
      {
        radioIdentification: 'Mustergemeinde 1-51-1',
        stationId: stationsMustergemeinde[0].id,
        seats: 3,
      },
    ])
    .returning();

  firetrucksByStation.sued = await db
    .insert(firetrucksSchema)
    .values([
      {
        radioIdentification: 'Mustergemeinde 2-46-1',
        stationId: stationsMustergemeinde[1].id,
        seats: 9,
      },
      {
        radioIdentification: 'Mustergemeinde 2-19-1',
        stationId: stationsMustergemeinde[1].id,
        seats: 8,
      },
    ])
    .returning();

  firetrucksByStation.musterdorf = await db
    .insert(firetrucksSchema)
    .values([
      {
        radioIdentification: 'Mustergemeinde 3-48-1',
        stationId: stationsMustergemeinde[2].id,
        seats: 6,
      },
    ])
    .returning();

  firetrucksByStation.musterstadt = await db
    .insert(firetrucksSchema)
    .values([
      {
        radioIdentification: 'Mustergemeinde 3-46-1',
        stationId: stationsMustergemeinde[3].id,
        seats: 9,
      },
      {
        radioIdentification: 'Mustergemeinde 3-40-1',
        stationId: stationsMustergemeinde[3].id,
        seats: 6,
      },
      {
        radioIdentification: 'Mustergemeinde 3-38-1',
        stationId: stationsMustergemeinde[3].id,
        seats: 3,
      },
      {
        radioIdentification: 'Mustergemeinde 3-67-1',
        stationId: stationsMustergemeinde[3].id,
        seats: 3,
      },
      {
        radioIdentification: 'Mustergemeinde 3-67-2',
        stationId: stationsMustergemeinde[3].id,
        seats: 3,
      },
      {
        radioIdentification: 'Mustergemeinde 3-11-2',
        stationId: stationsMustergemeinde[3].id,
        seats: 4,
      },
    ])
    .returning();

  await db
    .insert(crewsSchema)
    .values(
      firetrucksByStation.mitte.map((firetruck) => ({
        firetruckId: firetruck.id,
      })),
    )
    .returning();

  await db
    .insert(crewsSchema)
    .values(
      firetrucksByStation.sued.map((firetruck) => ({
        firetruckId: firetruck.id,
      })),
    )
    .returning();

  await db
    .insert(crewsSchema)
    .values(
      firetrucksByStation.musterdorf.map((firetruck) => ({
        firetruckId: firetruck.id,
      })),
    )
    .returning();

  await db
    .insert(crewsSchema)
    .values(
      firetrucksByStation.musterstadt.map((firetruck) => ({
        firetruckId: firetruck.id,
      })),
    )
    .returning();

  const firefighersByStation: {
    [station: string]: null | FirefighterEntity[];
  } = {};

  firefighersByStation.mitte = await db
    .insert(firefightersSchema)
    .values(
      Array.from({ length: 15 }, () => ({
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      })),
    )
    .returning();

  firefighersByStation.sued = await db
    .insert(firefightersSchema)
    .values(
      Array.from({ length: 15 }, () => ({
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[1].id,
      })),
    )
    .returning();

  firefighersByStation.musterdorf = await db
    .insert(firefightersSchema)
    .values(
      Array.from({ length: 15 }, () => ({
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[2].id,
      })),
    )
    .returning();

  firefighersByStation.musterstadt = await db
    .insert(firefightersSchema)
    .values(
      Array.from({ length: 15 }, () => ({
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[3].id,
      })),
    )
    .returning();

  await db
    .insert(beaconsSchema)
    .values(
      firefighersByStation.mitte.map((firefighter) => ({
        firefighterId: firefighter.id,
      })),
    )
    .returning();

  await db
    .insert(beaconsSchema)
    .values(
      firefighersByStation.sued.map((firefighter) => ({
        firefighterId: firefighter.id,
      })),
    )
    .returning();

  await db
    .insert(beaconsSchema)
    .values(
      firefighersByStation.musterdorf.map((firefighter) => ({
        firefighterId: firefighter.id,
      })),
    )
    .returning();

  await db
    .insert(beaconsSchema)
    .values(
      firefighersByStation.musterstadt.map((firefighter) => ({
        firefighterId: firefighter.id,
      })),
    )
    .returning();

  await seedQualifications();
}

void main();
