import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { firefighters } from './firefighters';
import { InferSelectModel, relations } from 'drizzle-orm';

const qualifications = sqliteTable('qualifications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text('type', {
    enum: [
      'Lehrgang',
      'Führerschein',
      'Medizinische Untersuchung',
      'Voraussetzung',
      'Führungsposition',
      'Fachgebiet',
      'Beruf',
    ],
  }).notNull(),
  name: text('name').notNull(),
});

const qualificationsRelations = relations(qualifications, ({ many }) => ({
  qualificationToFirefighter: many(qualificationToFirefighter),
}));

const qualificationToFirefighter = sqliteTable(
  'qualificationToFirefighter',
  {
    qualificationId: text('qualification_id')
      .notNull()
      .references(() => qualifications.id),
    firefighterId: text('firefighter_id')
      .notNull()
      .references(() => firefighters.id),
    status: text('status', {
      enum: ['active', 'expired'],
    }).default('active'),
  },
  (t) => [primaryKey({ columns: [t.qualificationId, t.firefighterId] })],
);

const qualificationToFirefighterRelations = relations(
  qualificationToFirefighter,
  ({ one }) => ({
    qualification: one(qualifications, {
      fields: [qualificationToFirefighter.qualificationId],
      references: [qualifications.id],
    }),
    firefighter: one(firefighters, {
      fields: [qualificationToFirefighter.firefighterId],
      references: [firefighters.id],
    }),
  }),
);

type QualificationEntity = InferSelectModel<typeof qualifications>;
type QualificationToFirefighterEntity = InferSelectModel<
  typeof qualificationToFirefighter
>;

export {
  qualifications,
  qualificationsRelations,
  qualificationToFirefighter,
  qualificationToFirefighterRelations,
};
export { type QualificationEntity, type QualificationToFirefighterEntity };
