import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { firefighters } from "../firefighters/schema";
import { InferSelectModel } from "drizzle-orm";

const qualifications = sqliteTable("qualifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text("type"),
  name: text("name"),
});

const qualificationToFirefighter = sqliteTable(
  "qualificationToFirefighter",
  {
    qualificationId: text("qualification_id")
      .notNull()
      .references(() => qualifications.id),
    firefighterId: text("firefighter_id")
      .notNull()
      .references(() => firefighters.id),
  },
  (t) => [primaryKey({ columns: [t.qualificationId, t.firefighterId] })],
);

type Qualifications = InferSelectModel<typeof qualifications>;

export { qualifications, qualificationToFirefighter };
export { type Qualifications };
