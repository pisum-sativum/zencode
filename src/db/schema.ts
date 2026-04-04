import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const dsaTopic = pgTable(
  "dsa_topic",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    sequence: integer("sequence").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .defaultNow()
      .notNull(),
  },
  (table) => [index("dsa_topic_sequence_idx").on(table.sequence)],
);

export const dsaQuestion = pgTable(
  "dsa_question",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    topicId: text("topic_id")
      .notNull()
      .references(() => dsaTopic.id, { onDelete: "cascade" }),
    level: text("level").notNull(),
    title: text("title").notNull(),
    difficulty: text("difficulty").notNull(),
    averageMinutes: integer("average_minutes").notNull(),
    summary: text("summary").notNull(),
    statement: jsonb("statement").$type<string[]>().notNull(),
    constraints: jsonb("constraints").$type<string[]>().notNull(),
    examples: jsonb("examples")
      .$type<
        Array<{
          title: string;
          input: string;
          output: string;
          explanation: string;
        }>
      >()
      .notNull(),
    relatedTopics: jsonb("related_topics").$type<string[]>().notNull(),
    judgeTokens: jsonb("judge_tokens").$type<string[]>().notNull(),
    starterCode: jsonb("starter_code")
      .$type<Record<string, string | undefined>>()
      .notNull(),
    sequence: integer("sequence").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("dsa_question_topic_id_idx").on(table.topicId),
    index("dsa_question_level_idx").on(table.level),
    index("dsa_question_sequence_idx").on(table.sequence),
  ],
);

export const dsaTestCase = pgTable(
  "dsa_test_case",
  {
    id: text("id").primaryKey(),
    questionId: text("question_id")
      .notNull()
      .references(() => dsaQuestion.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    input: text("input").notNull(),
    expectedOutput: text("expected_output").notNull(),
    sequence: integer("sequence").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("dsa_test_case_question_id_idx").on(table.questionId),
    index("dsa_test_case_sequence_idx").on(table.sequence),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const dsaTopicRelations = relations(dsaTopic, ({ many }) => ({
  questions: many(dsaQuestion),
}));

export const dsaQuestionRelations = relations(dsaQuestion, ({ one, many }) => ({
  topic: one(dsaTopic, {
    fields: [dsaQuestion.topicId],
    references: [dsaTopic.id],
  }),
  testCases: many(dsaTestCase),
}));

export const dsaTestCaseRelations = relations(dsaTestCase, ({ one }) => ({
  question: one(dsaQuestion, {
    fields: [dsaTestCase.questionId],
    references: [dsaQuestion.id],
  }),
}));
