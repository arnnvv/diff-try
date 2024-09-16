import { pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name: string): string => `figma_${name}`,
);

export const users = createTable("users", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  number: varchar("number").unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = createTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 21 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const rooms = createTable("rooms", {
  id: varchar("id").primaryKey(),
  ownerId: varchar("owner_id", { length: 21 })
    .notNull()
    .references(() => users.id),
});
