import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all messages
export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

// Mutation to send a new message
export const sendMessage = mutation({
  args: {
    body: v.string(),
    userId: v.string(),
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const message = {
      body: args.body,
      userId: args.userId,
      userName: args.userName,
      timestamp: Date.now(),
    };
    return await ctx.db.insert("messages", message);
  },
});