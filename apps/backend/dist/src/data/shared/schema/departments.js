import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { stations } from "./stations";
var departments = sqliteTable("departments", {
    id: text("id").primaryKey().$defaultFn(function() {
        return crypto.randomUUID();
    }),
    name: text("name").notNull()
});
var departmentsRelations = relations(departments, function(param) {
    var many = param.many;
    return {
        stations: many(stations)
    };
});
export { departments, departmentsRelations };
