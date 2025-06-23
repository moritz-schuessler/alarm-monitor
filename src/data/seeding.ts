import db from ".";
import { firetrucks, stations } from "./schema";

async function main() {
  const stationArray = [
    ...(await db.insert(stations).values({ name: "Mitte" }).returning()),
    ...(await db.insert(stations).values({ name: "Süd" }).returning()),
    ...(await db.insert(stations).values({ name: "Musterdorf" }).returning()),
  ];

  {
    await db.insert(firetrucks).values({
      radioIdentification: "Mustergemeinde 1-30-1",
      stationId: stationArray[0].id,
    });

    await db.insert(firetrucks).values({
      radioIdentification: "Mustergemeinde 1-44-1",
      stationId: stationArray[0].id,
    });

    await db.insert(firetrucks).values({
      radioIdentification: "Mustergemeinde 1-12-1",
      stationId: stationArray[0].id,
    });

    await db.insert(firetrucks).values({
      radioIdentification: "Mustergemeinde 1-51-1",
      stationId: stationArray[0].id,
    });
  }

  {
    await db.insert(firetrucks).values({
      radioIdentification: "Mustergemeinde 1-46-1",
      stationId: stationArray[1].id,
    });

    await db.insert(firetrucks).values({
      radioIdentification: "Mustergemeinde 2-19-1",
      stationId: stationArray[1].id,
    });
  }

  {
    await db.insert(firetrucks).values({
      radioIdentification: "Mustergemeinde 1-48-1",
      stationId: stationArray[2].id,
    });
  }
}

main();
