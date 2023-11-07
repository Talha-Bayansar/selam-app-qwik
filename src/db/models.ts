import { type members } from "./schema";

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
