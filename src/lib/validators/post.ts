import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be at least 128 characters" }),
  subredditId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;

export const PostUpdateValidator = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be at least 128 characters" }),
  subredditId: z.string(),
  content: z.any(),
});

export type PostUpdateRequest = z.infer<typeof PostUpdateValidator>;

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(),
});

export const idPostSchema = z.object({
  id: z.string(),
});

export type IdPostSchemaType = z.infer<typeof idPostSchema>;
