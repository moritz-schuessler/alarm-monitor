import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { firetrucks } from "../firetrucks/schema";
import { firefighters } from "../firefighters/schema";
import { InferSelectModel, relations } from "drizzle-orm";

const crews = sqliteTable("crews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  isLocked: integer("is_locked", { mode: "boolean" }),
  firetruckId: text("firetruck_id"),
});

const crewsRelations = relations(crews, ({ one, many }) => ({
  firetruck: one(firetrucks, {
    fields: [crews.firetruckId],
    references: [firetrucks.id],
  }),
  firefighters: many(firefighters),
}));

type Crews = InferSelectModel<typeof crews>;

export { crews, crewsRelations };
export { type Crews };
