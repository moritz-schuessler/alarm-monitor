import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const departments = sqliteTable("departments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  stations: many(stations),
}));

export const stations = sqliteTable("stations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  departmentId: text("department_id"),
});

export const stationsRelations = relations(stations, ({ one, many }) => ({
  departments: one(departments, {
    fields: [stations.departmentId],
    references: [departments.id],
  }),
  firetrucks: many(firetrucks),
  firefighters: many(firefighters),
}));

export const firetrucks = sqliteTable("firetrucks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  radioIdentification: text("radio_id").notNull(),
  stationId: text("station_id"),
});

export const firetrucksRelations = relations(firetrucks, ({ one }) => ({
  station: one(stations, {
    fields: [firetrucks.stationId],
    references: [stations.id],
  }),
}));

export const firefighters = sqliteTable("firefighters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  stationId: text("station_id"),
});

export const firefightersRelations = relations(
  firefighters,
  ({ one, many }) => ({
    station: one(stations, {
      fields: [firefighters.stationId],
      references: [stations.id],
    }),
    beacons: many(beacons),
  }),
);

export const beacons = sqliteTable("beacons", {
  id: text("id").primaryKey(),
  firefighterId: text("firefighter_id"),
});

export const beaconsRelations = relations(beacons, ({ one }) => ({
  firefighter: one(firefighters, {
    fields: [beacons.firefighterId],
    references: [firefighters.id],
  }),
}));

type Departments = InferSelectModel<typeof departments>;
type Stations = InferSelectModel<typeof stations>;
type Firetrucks = InferSelectModel<typeof firetrucks>;
type Firefighters = InferSelectModel<typeof firefighters>;
type Beacons = InferSelectModel<typeof beacons>;

export {
  type Departments,
  type Stations,
  type Firetrucks,
  type Firefighters,
  type Beacons,
};
