import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { formatCamel } from "@/lib/utils";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    const { name } = await req.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!isAdmin) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (isAdmin.role !== "ADMIN") {
      return new Response("Forbidden", { status: 403 });
    }

    const users = await db.user.create({
      data: {
        name: formatCamel(name),
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010",
        password: "mts123",
        role: "TEACHER",
        username: nanoid(10),
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
