import { InferSelectModel, relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { firetrucks } from "../firetrucks/schema";
import { stations } from "../stations/schema";

const incidents = sqliteTable("incidents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  keyword: text("keyword"),
  alarmTime: text("alarm_time"),
  adress: text("address"),
});

const incidentsRelations = relations(incidents, ({ many }) => ({
  firetrucks: many(firetrucks),
}));

const incidentToStation = sqliteTable(
  "incidentToStation",
  {
    incidentId: text("incident_id")
      .notNull()
      .references(() => incidents.id),
    stationId: text("station_id")
      .notNull()
      .references(() => stations.id),
  },
  (t) => [primaryKey({ columns: [t.incidentId, t.stationId] })],
);

type Incidents = InferSelectModel<typeof incidents>;
type IncidentToStation = InferSelectModel<typeof incidentToStation>;

export { incidents, incidentsRelations, incidentToStation };
export { type Incidents, type IncidentToStation };
