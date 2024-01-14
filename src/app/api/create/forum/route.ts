import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import {
  EditCommunityValidator,
  createCommunityValidator,
} from "@/lib/validators/community";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, category, description } =
      createCommunityValidator.parse(body);

    if (!category) {
      return new Response("Kategori Kosong!", { status: 403 });
    }

    const existingForum = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (existingForum) {
      return new Response("Nama Forum Sudah Ada.", { status: 409 });
    }

    const forum = await db.subreddit.create({
      data: {
        name,
        imageUrl:
          "https://utfs.io/f/e6dce0a0-c21d-4bd0-a00d-a352000db32f-hp5lsm.png",
        description,
        category,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: forum.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}

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

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { communityId, description, name, category } =
      EditCommunityValidator.parse(body);

    if (!category) {
      return new Response("Category is required", { status: 422 });
    }

    const existingCommunity = await db.subreddit.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!existingCommunity) {
      return new Response("Community not found", { status: 404 });
    }

    if (existingCommunity.creatorId !== session.user.id) {
      return new Response("Unauthorized", { status: 403 });
    }
    const community = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (community && community.id !== communityId) {
      return new Response("Community already exists", { status: 409 });
    }

    await db.subreddit.update({
      where: {
        id: communityId,
      },
      data: {
        description,
        name,
        category,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
