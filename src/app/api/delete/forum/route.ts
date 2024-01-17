import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { idUserSchema } from "@/lib/validators/user";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isAdmin = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!isAdmin) {
      return new Response("User not found", { status: 404 });
    }

    if (isAdmin.role !== "ADMIN") {
      return new Response("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { id } = idUserSchema.parse(body);

    const Forum = await db.subreddit.findFirst({
      where: {
        id,
      },
    });

    if (!Forum) {
      return new Response("Forum not found", { status: 404 });
    }

    //all checks complete ✅
    await db.subreddit.delete({
      where: {
        id,
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
