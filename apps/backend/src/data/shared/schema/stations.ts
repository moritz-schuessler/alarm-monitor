import { InferSelectModel, relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { departments } from './departments';
import { firetrucks } from './firetrucks';
import { firefighters } from './firefighters';
import { incidentsToStations } from './incidents';

const stations = sqliteTable('stations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  departmentId: text('department_id'),
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

type StationEntity = InferSelectModel<typeof stations>;

export { stations, stationsRelations };
export { type StationEntity };
