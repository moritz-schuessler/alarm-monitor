import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { departments } from "../departments/schema";
import { firetrucks } from "../firetrucks/schema";
import { firefighters } from "../firefighters/schema";

const stations = sqliteTable("stations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  departmentId: text("department_id"),
});

const stationsRelations = relations(stations, ({ one, many }) => ({
  departments: one(departments, {
    fields: [stations.departmentId],
    references: [departments.id],
  }),
  firetrucks: many(firetrucks),
  firefighters: many(firefighters),
}));

type Stations = InferSelectModel<typeof stations>;

export { stations, stationsRelations };
export { type Stations };
