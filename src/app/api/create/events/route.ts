import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CreateEventValidatorServer } from "@/lib/validators/event";
import {
  CreateEventValidator,
  CreateEventValidatorServerType,
  CreateEventValidatorType,
} from "@/lib/validators/event";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const values: CreateEventValidatorServerType = await req.json();

    const formattedBody = {
      ...values,
      startAt: new Date(values.startAt),
      setExpiresAt: new Date(values.setExpiresAt),
    };

    const { setExpiresAt, startAt, title, description } =
      CreateEventValidatorServer.parse(formattedBody);

    if (!startAt) {
      return new Response("Tanggal event tidak boleh kosong!", {
        status: 422,
      });
    }

    if (!setExpiresAt) {
      return new Response("Tanggal event tidak boleh kosong!", {
        status: 422,
      });
    }

    await db.events.create({
      data: {
        title: values.title,
        description: values.description,
        fileUrl: values.url,
        start: values.startAt,
        end: values.setExpiresAt,
      },
    });

    return new Response("OK!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
