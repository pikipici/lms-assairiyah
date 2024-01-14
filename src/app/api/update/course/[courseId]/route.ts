import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getAuthSession();
    const { courseId } = params;
    const values = await req.json();
    if (!session)
      return new NextResponse("Unauthorized", {
        status: 401,
      });

    const cekCreator = await db.course.findFirst({
      where: {
        id: courseId,
        userId: session.user.id,
      },
    });

    if (!cekCreator)
      return new NextResponse("Unauthorized", {
        status: 403,
      });

    const course = await db.course.update({
      where: {
        id: courseId,
        userId: session.user.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
