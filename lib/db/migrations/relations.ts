import { relations } from "drizzle-orm/relations";
import { User, Suggestion, Document, Chat, Message, Vote } from "./schema";

export const SuggestionRelations = relations(Suggestion, ({one}) => ({
	User: one(User, {
		fields: [Suggestion.userId],
		references: [User.id]
	}),
	Document: one(Document, {
		fields: [Suggestion.documentId],
		references: [Document.id]
	}),
}));

export const UserRelations = relations(User, ({many}) => ({
	Suggestions: many(Suggestion),
	Chats: many(Chat),
	Documents: many(Document),
}));

export const DocumentRelations = relations(Document, ({one, many}) => ({
	Suggestions: many(Suggestion),
	User: one(User, {
		fields: [Document.userId],
		references: [User.id]
	}),
}));

export const MessageRelations = relations(Message, ({one, many}) => ({
	Chat: one(Chat, {
		fields: [Message.chatId],
		references: [Chat.id]
	}),
	Votes: many(Vote),
}));

export const ChatRelations = relations(Chat, ({one, many}) => ({
	Messages: many(Message),
	User: one(User, {
		fields: [Chat.userId],
		references: [User.id]
	}),
	Votes: many(Vote),
}));

export const VoteRelations = relations(Vote, ({one}) => ({
	Chat: one(Chat, {
		fields: [Vote.chatId],
		references: [Chat.id]
	}),
	Message: one(Message, {
		fields: [Vote.messageId],
		references: [Message.id]
	}),
}));