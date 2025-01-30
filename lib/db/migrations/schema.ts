import { pgTable, uuid, varchar, foreignKey, timestamp, text, boolean, json, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const User = pgTable("User", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	email: varchar("email", { length: 64 }).notNull(),
	password: varchar("password", { length: 64 }),
});

export const Suggestion = pgTable("Suggestion", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	documentId: uuid("documentId").notNull(),
	documentCreatedAt: timestamp("documentCreatedAt", { mode: 'string' }).notNull(),
	originalText: text("originalText").notNull(),
	suggestedText: text("suggestedText").notNull(),
	description: text("description"),
	isResolved: boolean("isResolved").default(false).notNull(),
	userId: uuid("userId").notNull().references(() => User.id),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		Suggestion_documentId_documentCreatedAt_Document_id_createdAt_f: foreignKey({
			columns: [table.documentId, table.documentCreatedAt],
			foreignColumns: [Document.id, Document.createdAt],
			name: "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_f"
		}),
	}
});

export const Message = pgTable("Message", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	chatId: uuid("chatId").notNull().references(() => Chat.id),
	role: varchar("role").notNull(),
	content: json("content").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
});

export const Chat = pgTable("Chat", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
	userId: uuid("userId").notNull().references(() => User.id),
	title: text("title").notNull(),
	visibility: varchar("visibility").default('private').notNull(),
});

export const Vote = pgTable("Vote", {
	chatId: uuid("chatId").notNull().references(() => Chat.id),
	messageId: uuid("messageId").notNull().references(() => Message.id),
	isUpvoted: boolean("isUpvoted").notNull(),
},
(table) => {
	return {
		Vote_chatId_messageId_pk: primaryKey({ columns: [table.chatId, table.messageId], name: "Vote_chatId_messageId_pk"}),
	}
});

export const Document = pgTable("Document", {
	id: uuid("id").defaultRandom().notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
	title: text("title").notNull(),
	content: text("content"),
	userId: uuid("userId").notNull().references(() => User.id),
	text: varchar("text").default('text').notNull(),
},
(table) => {
	return {
		Document_id_createdAt_pk: primaryKey({ columns: [table.id, table.createdAt], name: "Document_id_createdAt_pk"}),
	}
});