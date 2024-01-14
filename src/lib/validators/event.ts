import { z } from "zod";
import { DateRange } from "react-day-picker";

export const CreateEventValidator = z.object({
  title: z
    .string()
    .min(5, { message: "Judul Event harus minimal harus 5 kata" })
    .max(150),
  description: z
    .string()
    .min(10, { message: "Deskripsi forum minimal harus 10 kata" })
    .max(300),
});

export const CreateEventValidatorServer = CreateEventValidator.extend({
  url: z.optional(z.string()),
  startAt: z.any(),
  setExpiresAt: z.any(),
});

export type CreateEventValidatorType = z.infer<typeof CreateEventValidator>;
export type CreateEventValidatorServerType = z.infer<
  typeof CreateEventValidatorServer
>;

//   z.literal("soon"),
//   z.literal("currently"),
//   z.literal("end"),
// ]);

// export const EventlistClient = z.object({
//   eventId: z.string(),
//   category: z.string(),
// });

// export type AnimeWatchlistClientType = z.infer<typeof AnimeWatchlistClient>;

// export const AnimeWatchlistServer = z.object({
//   animeId: z.string(),
//   category: ZodCategoryType,
// });

// export type AnimeWatchlistServerType = z.infer<typeof AnimeWatchlistServer>;

// export const AnimeWatchlistUpdate = z.object({
//   animeId: z.string(),
//   category: ZodCategoryType,
//   dropTo: ZodCategoryType,
// });

// export type AnimeWatchlistUpdateType = z.infer<typeof AnimeWatchlistUpdate>;

// export const AnimeWatchlistDelete = z.object({
//   watchlistId: z.string(),
//   category: ZodCategoryType,
// });

// export type AnimeWatchlistDeleteType = z.infer<typeof AnimeWatchlistDelete>;
