import { Mapel, Course } from "@prisma/client";

import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithMapel = Course & {
  mapel: Mapel | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  mapelId?: string;
};

// type GetCourseId = {
//   userId: string;
//   courseId: string;
// }

// export const getCoursesId = async ({
//   userId,
//   courseId,
// }: GetCourseId): Promise<CourseWithProgressWithMapel> => {
//   try {
//     const courses = await db.course.findUnique({
//       where: {
//         id: courseId,
//       },
//     });

//     const coursesWithProgress: CourseWithProgressWithMapel =
//       await Promise.all(
//         const progressPercentage = await getProgress(userId, course.id);

//           return {
//             ...course,
//             progress: progressPercentage,
//           };
//       );

//     return coursesWithProgress;
//   } catch (error) {
//     console.log("[GET_COURSES]", error);
//     return [];
//   }
// };

export const getCourses = async ({
  userId,
  title,
  mapelId,
}: GetCourses): Promise<CourseWithProgressWithMapel[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        mapelId,
      },
      include: {
        mapel: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithMapel[] =
      await Promise.all(
        courses.map(async (course) => {
          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
