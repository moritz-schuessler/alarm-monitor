import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { firetrucks } from "./firetrucks";
import { firefighters } from "./firefighters";
import { relations } from "drizzle-orm";
var crews = sqliteTable("crews", {
    id: text("id").primaryKey().$defaultFn(function() {
        return crypto.randomUUID();
    }),
    isLocked: integer("is_locked", {
        mode: "boolean"
    }),
    firetruckId: text("firetruck_id").notNull()
});
var crewsRelations = relations(crews, function(param) {
    var one = param.one, many = param.many;
    return {
        firetruck: one(firetrucks, {
            fields: [
                crews.firetruckId
            ],
            references: [
                firetrucks.id
            ]
        }),
        firefighters: many(firefighters)
    };
});
export { crews, crewsRelations };
