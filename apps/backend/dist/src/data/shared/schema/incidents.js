import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { firetrucks } from "./firetrucks";
import { stations } from "./stations";
var incidents = sqliteTable("incidents", {
    id: text("id").primaryKey().$defaultFn(function() {
        return crypto.randomUUID();
    }),
    keyword: text("keyword"),
    alarmTime: text("alarm_time"),
    adress: text("address")
});
var incidentsRelations = relations(incidents, function(param) {
    var many = param.many;
    return {
        firetrucks: many(firetrucks),
        incidentsToStations: many(incidentsToStations)
    };
});
var incidentsToStations = sqliteTable("incidentsToStations", {
    incidentId: text("incident_id").notNull().references(function() {
        return incidents.id;
    }),
    stationId: text("station_id").notNull().references(function() {
        return stations.id;
    })
}, function(t) {
    return [
        primaryKey({
            columns: [
                t.incidentId,
                t.stationId
            ]
        })
    ];
});
var incidentsToStationsRelations = relations(incidentsToStations, function(param) {
    var one = param.one;
    return {
        incident: one(incidents, {
            fields: [
                incidentsToStations.incidentId
            ],
            references: [
                incidents.id
            ]
        }),
        station: one(stations, {
            fields: [
                incidentsToStations.stationId
            ],
            references: [
                stations.id
            ]
        })
    };
});
export { incidents, incidentsRelations, incidentsToStations, incidentsToStationsRelations };
