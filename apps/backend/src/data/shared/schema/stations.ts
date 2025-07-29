import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { departments } from "./departments.js";
import { firetrucks } from "./firetrucks.js";
import { firefighters } from "./firefighters.js";
import { incidentsToStations } from "./incidents.js";

const stations = sqliteTable("stations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  departmentId: text("department_id"),
});

const stationsRelations = relations(stations, ({ one, many }) => ({
  department: one(departments, {
    fields: [stations.departmentId],
    references: [departments.id],
  }),
  firetrucks: many(firetrucks),
  firefighters: many(firefighters),
  incidentsToStations: many(incidentsToStations),
}));

type Stations = InferSelectModel<typeof stations>;

export { stations, stationsRelations };
export { type Stations };
