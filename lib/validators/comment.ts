import { z } from "zod";

const commentText = z
  .string()
  .min(3, { message: "Must be 3 or more characters long" })
  .max(100, { message: "Must be 100 or less characters long" });

export const CommentValidator = z.object({
  gameId: z.string(),
  text: commentText,
});

export const RemoveCommentValidator = z.object({
  gameId: z.string(),
  userId: z.string(),
});

export const UpdateCommentValidator = z.object({
  gameId: z.string(),
  userId: z.string(),
  text: commentText,
});

export type CommentRequest = z.infer<typeof CommentValidator>;
export type RemoveCommentPayload = z.infer<typeof RemoveCommentValidator>;
export type UpdateCommentPayload = z.infer<typeof UpdateCommentValidator>;
