import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { stations } from "./stations";
import { beacons } from "./beacons";
import { crews } from "./crews";
import { qualificationToFirefighter } from "./qualifications";
var firefighters = sqliteTable("firefighters", {
    id: text("id").primaryKey().$defaultFn(function() {
        return crypto.randomUUID();
    }),
    name: text("name").notNull(),
    stationId: text("station_id"),
    crewId: text("crew_id")
});
var firefightersRelations = relations(firefighters, function(param) {
    var one = param.one, many = param.many;
    return {
        station: one(stations, {
            fields: [
                firefighters.stationId
            ],
            references: [
                stations.id
            ]
        }),
        crew: one(crews, {
            fields: [
                firefighters.crewId
            ],
            references: [
                crews.id
            ]
        }),
        beacons: many(beacons),
        qualificationToFirefighter: many(qualificationToFirefighter)
    };
});
export { firefighters, firefightersRelations };
