import { z } from "zod";

export const idUserSchema = z.object({
  id: z.string(),
});

export type IdUserSchemaType = z.infer<typeof idUserSchema>;
