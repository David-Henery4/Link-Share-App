// import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";


// config({ path: ".env.local" });

// Remember to change "SECOND_DB_URL" back to "DATABASE_URL"

export default defineConfig({
  schema: "./src/db/schemas",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
