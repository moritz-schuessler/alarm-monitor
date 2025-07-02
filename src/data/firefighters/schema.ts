import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { stations } from "../stations/schema";
import { beacons } from "../beacons/schema";

const firefighters = sqliteTable("firefighters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  stationId: text("station_id"),
});

const firefightersRelations = relations(firefighters, ({ one, many }) => ({
  station: one(stations, {
    fields: [firefighters.stationId],
    references: [stations.id],
  }),
  beacons: many(beacons),
}));

type Firefighters = InferSelectModel<typeof firefighters>;

export { firefighters, firefightersRelations };
export { type Firefighters };
