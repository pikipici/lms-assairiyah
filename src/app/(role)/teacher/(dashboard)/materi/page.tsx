import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { MateriColumn } from "@/components/item/teacher/materi/columns";
import { MateriClient } from "@/components/item/teacher/materi/client";

import { ShellMenu } from "@/components/item/ShellMenu";
import { getAuthSession } from "@/lib/auth";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

const CoursesPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const teacherId = session.user.id;

  const courses = await db.course.findMany({
    where: {
      creatorId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      chapters: true,
    },
  });

  const formattedMateri: MateriColumn[] = courses.map((item) => ({
    id: item.id,
    title: item.title,
    createdAt: moment(item.createdAt).format("LL"),
    chapter: item.chapters.length,
    isPublished: item.isPublished,
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <MateriClient data={formattedMateri} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default CoursesPage;
