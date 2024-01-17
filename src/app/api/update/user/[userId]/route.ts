import { z } from "zod";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getAuthSession();
    const { userId } = params;
    const values = await req.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return new NextResponse("User tidak ditemukan", { status: 403 });
    }

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[TEACHER_NAME_FORM_ID]", error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
