import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    const { title } = await req.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isTeacher = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!isTeacher) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (isTeacher.role !== "TEACHER") {
      return new Response("Forbidden", { status: 403 });
    }

    const course = await db.course.create({
      data: {
        userId: session.user.id,
        creatorId: session.user.id,
        title,
        name: title,
        imageUrl:
          "https://utfs.io/f/73fffaac-fbfe-4b43-80e0-5ff78f1b43f1-hobkd0.png",
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
