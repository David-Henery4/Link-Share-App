import {config} from "dotenv";
import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas"

config({path: ".env.local"})

const connectionString = process.env.DATABASE_URL!;

// KEEP an eye on schema if problem come arise, schema was added a while later!
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle({client, casing: "snake_case", schema})