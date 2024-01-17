import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import {
  CourseProgressServer,
  CourseProgressServerType,
  CourseProgressUpdate,
} from "@/lib/validators/course";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const payloads = body;

    if (body.length === 0) {
      return new Response("Nothing to add", { status: 422 });
    }

    const results = await Promise.all(
      payloads.map(async (payload: CourseProgressServerType) => {
        const { courseId, category } = CourseProgressServer.parse(payload);

        const course = await db.course.findUnique({
          where: {
            id: courseId,
          },
        });

        if (!course) {
          return new Response("Materi tidak ditemukan", { status: 404 });
        }

        const promises = [
          db.notStartedLearning.findFirst({
            where: {
              courseId,
              userId: session.user.id,
            },
          }),
          db.currentlyLearning.findFirst({
            where: {
              courseId,
              userId: session.user.id,
            },
          }),
          db.finishedLearning.findFirst({
            where: {
              courseId,
              userId: session.user.id,
            },
          }),
        ];

        const [pendingCourses, learningCourses, finishedCourses] =
          await Promise.all(promises);

        if (pendingCourses || learningCourses || finishedCourses) {
          return new Response("Materi sudah berada dalam daftar", {
            status: 409,
          });
        }

        if (category === "pending") {
          await db.notStartedLearning.create({
            data: {
              courseId,
              userId: session.user.id,
            },
          });
        } else if (category === "watching") {
          await db.currentlyLearning.create({
            data: {
              courseId,
              userId: session.user.id,
            },
          });
        } else if (category === "finished") {
          await db.finishedLearning.create({
            data: {
              courseId,
              userId: session.user.id,
            },
          });
        }

        return {
          success: true,
          message: "Materi berhasil ditambahkan ke dalam daftar",
        };
      })
    );

    const hasError = results.some(
      (result) => result instanceof Response && result.status === 409
    );
    if (hasError) {
      return new Response("Materi pembelajaran sudah berada dalam daftar", {
        status: 409,
      });
    }

    return new Response("OK");
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

    const { courseId, category, dropTo } = CourseProgressUpdate.parse(body);

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return new Response("Materi tidak ditemukan", { status: 404 });
    }

    if (category === "pending") {
      const pendingCourse = await db.notStartedLearning.findFirst({
        where: {
          courseId,
          userId: session.user.id,
        },
      });

      if (!pendingCourse) {
        return new Response("Materi tidak ditemukan.", {
          status: 404,
        });
      }

      await db.notStartedLearning.delete({
        where: {
          id: pendingCourse.id,
        },
      });
    } else if (category === "watching") {
      const learningCourse = await db.currentlyLearning.findFirst({
        where: {
          courseId,
          userId: session.user.id,
        },
      });

      if (!learningCourse) {
        return new Response("Materi tidak ditemukan.", {
          status: 404,
        });
      }

      await db.currentlyLearning.delete({
        where: {
          id: learningCourse.id,
        },
      });
    } else if (category === "finished") {
      const finishedCourse = await db.finishedLearning.findFirst({
        where: {
          courseId,
          userId: session.user.id,
        },
      });

      if (!finishedCourse) {
        return new Response("Materi tidak ditemukan.", {
          status: 404,
        });
      }

      await db.finishedLearning.delete({
        where: {
          id: finishedCourse.id,
        },
      });
    }

    // Add to new category
    if (dropTo === "pending") {
      await db.notStartedLearning.create({
        data: {
          courseId,
          userId: session.user.id,
        },
      });
    } else if (dropTo === "watching") {
      await db.currentlyLearning.create({
        data: {
          courseId,
          userId: session.user.id,
        },
      });
    } else if (dropTo === "finished") {
      await db.finishedLearning.create({
        data: {
          courseId,
          userId: session.user.id,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
