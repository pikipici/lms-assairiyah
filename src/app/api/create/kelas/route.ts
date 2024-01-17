import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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

    const kelas = await db.kelas.create({
      data: {
        name,
      },
    });

    return NextResponse.json(kelas);
  } catch (error) {
    console.log("[Tambah_Kelas]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
