import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env["PRIVATE_TURSO_DB_URL"] as string,
    authToken: process.env["PRIVATE_TURSO_DB_AUTH_TOKEN"],
  },
} satisfies Config;
