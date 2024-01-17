import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { slug: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.slug,
    },
    include: {
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

  if (!course) {
    return redirect("/");
  }

  return redirect(`/materi/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
