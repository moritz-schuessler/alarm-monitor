import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { firefighters } from "./firefighters";
import { relations } from "drizzle-orm";
var qualifications = sqliteTable("qualifications", {
    id: text("id").primaryKey().$defaultFn(function() {
        return crypto.randomUUID();
    }),
    type: text("type"),
    name: text("name")
});
var qualificationsRelations = relations(qualifications, function(param) {
    var many = param.many;
    return {
        incidentsToStations: many(qualificationToFirefighter)
    };
});
var qualificationToFirefighter = sqliteTable("qualificationToFirefighter", {
    qualificationId: text("qualification_id").notNull().references(function() {
        return qualifications.id;
    }),
    firefighterId: text("firefighter_id").notNull().references(function() {
        return firefighters.id;
    })
}, function(t) {
    return [
        primaryKey({
            columns: [
                t.qualificationId,
                t.firefighterId
            ]
        })
    ];
});
var qualificationToFirefighterRelations = relations(qualificationToFirefighter, function(param) {
    var one = param.one;
    return {
        qualification: one(qualifications, {
            fields: [
                qualificationToFirefighter.qualificationId
            ],
            references: [
                qualifications.id
            ]
        }),
        firefighter: one(firefighters, {
            fields: [
                qualificationToFirefighter.firefighterId
            ],
            references: [
                firefighters.id
            ]
        })
    };
});
export { qualifications, qualificationsRelations, qualificationToFirefighter, qualificationToFirefighterRelations };
