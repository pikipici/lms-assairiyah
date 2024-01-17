import { z } from "zod";

export const ZodCategoryType = z.union([
  z.literal("pending"),
  z.literal("watching"),
  z.literal("finished"),
]);

export const CourseProgressSchema = z.object({
  category: z.string().optional(),
  courseId: z.string().optional(),
});

export type CourseProgressSchemaType = z.infer<typeof CourseProgressSchema>;

export const CourseProgressClient = z.object({
  courseId: z.string(),
  category: z.string(),
});

export type CourseProgressClientType = z.infer<typeof CourseProgressClient>;

export const CourseProgressDelete = z.object({
  progressId: z.string(),
  category: ZodCategoryType,
});

export type CourseProgressDeleteType = z.infer<typeof CourseProgressDelete>;

export const CourseProgressUpdate = z.object({
  courseId: z.string(),
  category: ZodCategoryType,
  dropTo: ZodCategoryType,
});

export type CourseProgressUpdateType = z.infer<typeof CourseProgressUpdate>;

export const CourseProgressServer = z.object({
  courseId: z.string(),
  category: ZodCategoryType,
});

export type CourseProgressServerType = z.infer<typeof CourseProgressServer>;
