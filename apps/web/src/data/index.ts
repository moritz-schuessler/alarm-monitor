import * as schema from "./schema";
import "@/lib/envConfig";
import { drizzle } from "drizzle-orm/libsql";

const db = drizzle(process.env.DB_FILE_NAME!, { schema: schema });

export default db;
