import { pgTable, text, timestamp, jsonb, uuid, index } from 'drizzle-orm/pg-core';

export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  // Set when Google OAuth is active — used to enforce brand ownership per user.
  // Null means local/single-user mode (cookie-based identity only).
  userId: text('user_id'),

  // Top-level fields for easy querying
  companyName: text('company_name').notNull(),
  oneLiner: text('one_liner'),
  category: text('category'),
  stage: text('stage'),

  // Stored as JSONB for flexibility
  audience: jsonb('audience'),
  positioning: jsonb('positioning'),
  voice: jsonb('voice'),
  competitors: jsonb('competitors'),
  goals: jsonb('goals'),
  assets: jsonb('assets'),
  pipeline: jsonb('pipeline'),
  researchSources: jsonb('research_sources'),
});

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  brandId: uuid('brand_id').notNull().references(() => brands.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  title: text('title').notNull().default('New chat'),
  specialist: text('specialist'), // last active specialist in this conversation
  archivedAt: timestamp('archived_at'), // null = active, set = archived
}, (t) => [
  index('conversations_brand_id_idx').on(t.brandId),
]);

export const campaigns = pgTable('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  brandId: uuid('brand_id').notNull().references(() => brands.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  specialist: text('specialist'),
  summary: text('summary'),
  fullOutput: text('full_output'),
});

export const learnings = pgTable('learnings', {
  id: uuid('id').primaryKey().defaultRandom(),
  brandId: uuid('brand_id').notNull().references(() => brands.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  learning: text('learning').notNull(),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  brandId: uuid('brand_id').notNull().references(() => brands.id),
  conversationId: uuid('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  role: text('role').notNull(), // 'user' | 'assistant'
  content: text('content').notNull(),
  specialist: text('specialist'),
}, (t) => [
  index('messages_brand_id_idx').on(t.brandId),
  index('messages_conversation_id_idx').on(t.conversationId),
]);

export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
export type Conversation = typeof conversations.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Learning = typeof learnings.$inferSelect;
export type Message = typeof messages.$inferSelect;
