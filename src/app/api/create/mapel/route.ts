import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { formatMapel } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    const { name } = await req.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const mapel = await db.mapel.create({
      data: {
        name: formatMapel(name),
      },
    });

    return NextResponse.json(mapel);
  } catch (error) {
    console.log("[MAPEL_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
