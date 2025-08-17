import { InferSelectModel, relations } from 'drizzle-orm';
import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { firetrucks } from './firetrucks';
import { stations } from './stations';

const incidents = sqliteTable('incidents', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  keyword: text('keyword').notNull(),
  alarmTime: text('alarm_time').notNull(),
  adress: text('address').notNull(),
});

const incidentsRelations = relations(incidents, ({ many }) => ({
  firetrucks: many(firetrucks),
  incidentsToStations: many(incidentsToStations),
}));

const incidentsToStations = sqliteTable(
  'incidentsToStations',
  {
    incidentId: text('incident_id')
      .notNull()
      .references(() => incidents.id),
    stationId: text('station_id')
      .notNull()
      .references(() => stations.id),
  },
  (t) => [primaryKey({ columns: [t.incidentId, t.stationId] })],
);

const incidentsToStationsRelations = relations(
  incidentsToStations,
  ({ one }) => ({
    incident: one(incidents, {
      fields: [incidentsToStations.incidentId],
      references: [incidents.id],
    }),
    station: one(stations, {
      fields: [incidentsToStations.stationId],
      references: [stations.id],
    }),
  }),
);

type IncidentEntity = InferSelectModel<typeof incidents>;
type IncidentToStationEntity = InferSelectModel<typeof incidentsToStations>;

export {
  incidents,
  incidentsRelations,
  incidentsToStations,
  incidentsToStationsRelations,
};
export { type IncidentEntity, type IncidentToStationEntity };
