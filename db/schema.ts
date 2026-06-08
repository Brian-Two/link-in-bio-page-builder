import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    displayName: varchar("display_name", { length: 80 }).notNull(),
    slug: varchar("slug", { length: 64 }).notNull(),
    bio: varchar("bio", { length: 240 }),
    avatarUrl: text("avatar_url"),
    accentColor: varchar("accent_color", { length: 7 }).notNull().default("#256d85"),
    theme: varchar("theme", { length: 24 }).notNull().default("clean"),
    published: boolean("published").notNull().default(false),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("profiles_user_id_unique").on(table.userId),
    uniqueIndex("profiles_slug_unique").on(table.slug),
  ],
);

export const links = pgTable(
  "links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 80 }).notNull(),
    url: text("url").notNull(),
    visible: boolean("visible").notNull().default(true),
    position: integer("position").notNull(),
    ...timestamps,
  },
  (table) => [
    index("links_profile_id_idx").on(table.profileId),
    index("links_profile_position_idx").on(table.profileId, table.position),
  ],
);

export const clickEvents = pgTable(
  "click_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    linkId: uuid("link_id")
      .notNull()
      .references(() => links.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    occurredAt: timestamp("occurred_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    ipHash: varchar("ip_hash", { length: 128 }),
  },
  (table) => [
    index("click_events_link_id_idx").on(table.linkId),
    index("click_events_profile_id_idx").on(table.profileId),
    index("click_events_occurred_at_idx").on(table.occurredAt),
  ],
);

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
export type ClickEvent = typeof clickEvents.$inferSelect;
export type NewClickEvent = typeof clickEvents.$inferInsert;
