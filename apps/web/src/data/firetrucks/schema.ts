import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { stations } from "../stations/schema";
import { incidents } from "../incident/schema";
import { crews } from "../schema";

const firetrucks = sqliteTable("firetrucks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  radioIdentification: text("radio_id").notNull(),
  stationId: text("station_id").notNull(),
  activeIncident: text("active_incident"),
});

const firetrucksRelations = relations(firetrucks, ({ one }) => ({
  station: one(stations, {
    fields: [firetrucks.stationId],
    references: [stations.id],
  }),
  incident: one(incidents, {
    fields: [firetrucks.activeIncident],
    references: [incidents.id],
  }),
  crew: one(crews),
}));

type Firetrucks = InferSelectModel<typeof firetrucks>;

export { firetrucks, firetrucksRelations };
export { type Firetrucks };
