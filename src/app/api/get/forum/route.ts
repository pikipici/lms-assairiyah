import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import {
  EditCommunityValidator,
  createCommunityValidator,
} from "@/lib/validators/community";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { limit, page, category, query } = z
      .object({
        limit: z.string(),
        page: z.string(),
        category: z.string().nullish().optional(),
        query: z.string().nullish().optional(),
      })
      .parse({
        query: url.searchParams.get("q"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        category: url.searchParams.get("category"),
      });

    let whereClause = {};

    if (category) {
      if (query) {
        whereClause = {
          name: {
            contains: query,
          },
          category,
        };
      } else {
        whereClause = {
          category,
        };
      }
    } else if (query) {
      whereClause = {
        name: {
          contains: query,
        },
      };
    }

    const communities = await db.subreddit.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      where: whereClause,
      include: {
        Creator: true,
        posts: true,
      },
    });

    return new Response(JSON.stringify(communities));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
