import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";

export const client = createClient({
  url: process.env["PRIVATE_TURSO_DB_URL"] as string,
  authToken: process.env["PRIVATE_TURSO_DB_AUTH_TOKEN"],
});

export const db = drizzle(client);
