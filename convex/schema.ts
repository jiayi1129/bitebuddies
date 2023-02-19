import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
  }).index("by_token", ["tokenIdentifier"]),
  restaurants: defineTable({
    name: s.string(),
    location: s.string(),
    price: s.bigint(),
  }),
  groups: defineTable({
    restaurant: s.id("restaurants"),
    user: s.id("users"),
    timestamp: s.bigint(),
  }),
  group_chats: defineTable({
    group: s.id("groups"),
    name: s.string(),
  }),
  group_chat_users: defineTable({
    group_chat: s.id("group_chats"),
    user: s.id("users"),
  }),
  messages: defineTable({
    user: s.id("users"),
    body: s.string(),
  }),
});