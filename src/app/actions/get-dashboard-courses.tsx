import { Mapel, Chapter, Course, Tingkat } from "@prisma/client";

import { db } from "@/lib/db";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  mapel: Mapel;
  tingkat: Tingkat;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    // const purchasedCourses = await db.purchase.findMany({
    //   where: {
    //     userId: userId,
    //   },
    //   select: {
    //     course: {
    //       include: {
    //         category: true,
    //         chapters: {
    //           where: {
    //             isPublished: true,
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    // const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];
    const Materi = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        mapel: true,

        tingkat: true,
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    const courses = Materi as CourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }
    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter((course) => course.progress !== 0);

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
