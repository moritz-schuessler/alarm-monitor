import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { incidents } from './incidents';

const externalResources = sqliteTable('external_resources', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  crewSize: integer('crew_size'),
  incidentId: text('incident_id'),
});

const externalRessourceRelations = relations(externalResources, ({ one }) => ({
  incident: one(incidents, {
    fields: [externalResources.incidentId],
    references: [incidents.id],
  }),
}));

export { externalResources, externalRessourceRelations };
