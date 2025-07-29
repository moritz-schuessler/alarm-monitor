import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { firefighters } from "./firefighters";
var beacons = sqliteTable("beacons", {
    id: text("id").primaryKey(),
    firefighterId: text("firefighter_id")
});
var beaconsRelations = relations(beacons, function(param) {
    var one = param.one;
    return {
        firefighter: one(firefighters, {
            fields: [
                beacons.firefighterId
            ],
            references: [
                firefighters.id
            ]
        })
    };
});
export { beacons, beaconsRelations };
