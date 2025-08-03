import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { firetrucks } from './firetrucks';
import { firefighters } from './firefighters';
import { InferSelectModel, relations } from 'drizzle-orm';

const crews = sqliteTable('crews', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  isLocked: integer('is_locked', { mode: 'boolean' }),
  firetruckId: text('firetruck_id').notNull(),
});

const crewsRelations = relations(crews, ({ one, many }) => ({
  firetruck: one(firetrucks, {
    fields: [crews.firetruckId],
    references: [firetrucks.id],
  }),
  firefighters: many(firefighters),
}));

type CrewEntity = InferSelectModel<typeof crews>;

export { crews, crewsRelations };
export { type CrewEntity };
