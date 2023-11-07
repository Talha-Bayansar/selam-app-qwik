import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const organizations = sqliteTable("organization", {
  id: integer("id").primaryKey(),
  name: text("name"),
  logo: text("logo"),
});

export const members = sqliteTable("member", {
  id: integer("id").primaryKey(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  dateOfBirth: text("dateOfBirth"),
  phoneNumber: text("phoneNumber"),
  address: text("address"),
  gender: text("gender", { enum: ["male", "female"] }),
  organizationId: text("organizationId").references(() => organizations.id),
  groupId: text("groupId").references(() => groups.id),
});

export const groups = sqliteTable("group", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  organizationId: text("organizationId").references(() => organizations.id),
});

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
