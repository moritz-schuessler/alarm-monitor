import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { stations } from "../stations/schema";

const departments = sqliteTable("departments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
});

const departmentsRelations = relations(departments, ({ many }) => ({
  stations: many(stations),
}));

type Departments = InferSelectModel<typeof departments>;

export { departments, departmentsRelations };
export { type Departments };
