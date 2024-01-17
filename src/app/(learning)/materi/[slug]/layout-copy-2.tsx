import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/app/actions/get-progress";

import { CourseSidebar } from "@/components/item/materi/course-sidebar";
import { CourseNavbar } from "@/components/item/materi/course-navbar";
import { getAuthSession } from "@/lib/auth";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const userId = session?.user.id;

  const course = await db.course.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        {/* <CourseNavbar course={course} progressCount={progressCount} /> */}
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children} </main>
    </div>
  );
};

export default CourseLayout;
