import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { stations } from "./stations";
import { beacons } from "./beacons";
import { crews } from "./crews";
import { qualificationToFirefighter } from "./qualifications";

const firefighters = sqliteTable("firefighters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  stationId: text("station_id"),
  crewId: text("crew_id"),
});

const firefightersRelations = relations(firefighters, ({ one, many }) => ({
  station: one(stations, {
    fields: [firefighters.stationId],
    references: [stations.id],
  }),
  crew: one(crews, {
    fields: [firefighters.crewId],
    references: [crews.id],
  }),
  beacons: many(beacons),
  qualificationToFirefighter: many(qualificationToFirefighter),
}));

type Firefighters = InferSelectModel<typeof firefighters>;

export { firefighters, firefightersRelations };
export { type Firefighters };
