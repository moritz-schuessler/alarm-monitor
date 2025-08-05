import { InferSelectModel, relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { firefighters } from './firefighters';

const beacons = sqliteTable('beacons', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firefighterId: text('firefighter_id').notNull(),
});

const beaconsRelations = relations(beacons, ({ one }) => ({
  firefighter: one(firefighters, {
    fields: [beacons.firefighterId],
    references: [firefighters.id],
  }),
}));

type BeaconEntity = InferSelectModel<typeof beacons>;

export { beacons, beaconsRelations };
export { type BeaconEntity };
