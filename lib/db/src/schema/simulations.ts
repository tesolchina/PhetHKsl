import { pgTable, text, serial, boolean, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const simulationsTable = pgTable("simulations", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  nameEn: text("name_en").notNull(),
  nameZh: text("name_zh").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionZh: text("description_zh").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  gradeLevel: varchar("grade_level", { length: 20 }).notNull(),
  tagsEn: jsonb("tags_en").$type<string[]>().notNull().default([]),
  tagsZh: jsonb("tags_zh").$type<string[]>().notNull().default([]),
  urlEn: text("url_en").notNull(),
  urlZh: text("url_zh").notNull(),
  githubRepoUrl: text("github_repo_url"),
  thumbnailUrl: text("thumbnail_url"),
  hasChineseLocalization: boolean("has_chinese_localization").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  localDev: boolean("local_dev").notNull().default(false),
  customRoute: text("custom_route"),
  guide: jsonb("guide").$type<Array<{
    title: { en: string; zh: string };
    content: { en: string; zh: string };
  }>>().notNull().default([]),
});

export const insertSimulationSchema = createInsertSchema(simulationsTable).omit({ id: true });
export type InsertSimulation = z.infer<typeof insertSimulationSchema>;
export type SimulationRecord = typeof simulationsTable.$inferSelect;
