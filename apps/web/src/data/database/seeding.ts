import { fakerDE as faker } from "@faker-js/faker";

import db from "./index";
import {
  departments as departmentsSchema,
  stations as stationsSchema,
  firetrucks as firetrucksSchema,
  firefighters as firefightersSchema,
  Firetrucks,
  Firefighters,
} from "../shared/schema";

async function main() {
  await db.delete(firefightersSchema);
  await db.delete(firetrucksSchema);
  await db.delete(stationsSchema);
  await db.delete(departmentsSchema);

  const departments = await db
    .insert(departmentsSchema)
    .values([{ name: "Feuerwehr Mustergemeinde" }])
    .returning();

  const stationsMustergemeinde = await db
    .insert(stationsSchema)
    .values([
      { name: "Mitte", departmentId: departments[0].id },
      { name: "Süd", departmentId: departments[0].id },
      { name: "Musterdorf", departmentId: departments[0].id },
    ])
    .returning();

  const firetrucksByStation: {
    [station: string]: null | Firetrucks[];
  } = {};

  firetrucksByStation.mitte = await db
    .insert(firetrucksSchema)
    .values([
      {
        radioIdentification: "Mustergemeinde 1-30-1",
        stationId: stationsMustergemeinde[0].id,
        seats: 3,
      },
      {
        radioIdentification: "Mustergemeinde 1-44-1",
        stationId: stationsMustergemeinde[0].id,
        seats: 9,
      },
      {
        radioIdentification: "Mustergemeinde 1-11-1",
        stationId: stationsMustergemeinde[0].id,
        seats: 1,
      },
      {
        radioIdentification: "Mustergemeinde 1-51-1",
        stationId: stationsMustergemeinde[0].id,
        seats: 3,
      },
    ])
    .returning();

  firetrucksByStation.sued = await db
    .insert(firetrucksSchema)
    .values([
      {
        radioIdentification: "Mustergemeinde 2-46-1",
        stationId: stationsMustergemeinde[1].id,
        seats: 9,
      },
      {
        radioIdentification: "Mustergemeinde 2-19-1",
        stationId: stationsMustergemeinde[1].id,
        seats: 8,
      },
    ])
    .returning();

  firetrucksByStation.musterdorf = await db
    .insert(firetrucksSchema)
    .values([
      {
        radioIdentification: "Mustergemeinde 3-48-1",
        stationId: stationsMustergemeinde[2].id,
        seats: 6,
      },
    ])
    .returning();

  const firefighersByStation: { [station: string]: null | Firefighters[] } = {};

  firefighersByStation.mitte = await db
    .insert(firefightersSchema)
    .values([
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[0].id,
      },
    ])
    .returning();

  firefighersByStation.sued = await db
    .insert(firefightersSchema)
    .values([
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[1].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[1].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[1].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[1].id,
      },
    ])
    .returning();

  firefighersByStation.musterdorf = await db
    .insert(firefightersSchema)
    .values([
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[2].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[2].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[2].id,
      },
      {
        name: faker.person.fullName(),
        stationId: stationsMustergemeinde[2].id,
      },
    ])
    .returning();
}

main();
