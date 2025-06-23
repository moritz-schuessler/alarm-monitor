import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const firetruckTable = sqliteTable("firetruck", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  radioIdentification: text("radio-id").notNull(),
});
