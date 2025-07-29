import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { departments } from "./departments";
import { firetrucks } from "./firetrucks";
import { firefighters } from "./firefighters";
import { incidentsToStations } from "./incidents";
var stations = sqliteTable("stations", {
    id: text("id").primaryKey().$defaultFn(function() {
        return crypto.randomUUID();
    }),
    name: text("name").notNull(),
    departmentId: text("department_id")
});
var stationsRelations = relations(stations, function(param) {
    var one = param.one, many = param.many;
    return {
        department: one(departments, {
            fields: [
                stations.departmentId
            ],
            references: [
                departments.id
            ]
        }),
        firetrucks: many(firetrucks),
        firefighters: many(firefighters),
        incidentsToStations: many(incidentsToStations)
    };
});
export { stations, stationsRelations };
