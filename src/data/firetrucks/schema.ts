import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { stations } from "../stations/schema";

const firetrucks = sqliteTable("firetrucks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  radioIdentification: text("radio_id").notNull(),
  stationId: text("station_id"),
});

const firetrucksRelations = relations(firetrucks, ({ one }) => ({
  station: one(stations, {
    fields: [firetrucks.stationId],
    references: [stations.id],
  }),
}));

type Firetrucks = InferSelectModel<typeof firetrucks>;

export { firetrucks, firetrucksRelations };
export { type Firetrucks };
