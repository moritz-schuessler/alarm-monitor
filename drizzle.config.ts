import "@/lib/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/data/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
