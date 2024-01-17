import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/item/Shell";
import CustomSheetCourse from "@/components/ui/Custom-UI/sheet/CustomSheetCourse";
import { getAuthSession } from "@/lib/auth";
import { DragCourseType } from "@/types/item-type";
import DragDropProvider from "@/components/item/DragDropProvider";
import DragContainerClient from "@/components/item/DragContainerClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Progressku",
  description:
    "Riwayat terakhir kamu belajar apa saja? Cek disini untuk melihat progress kamu!",
};

const ProgressPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const promises = [
    db.notStartedLearning.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        course: true,
      },
    }),
    db.currentlyLearning.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        course: true,
      },
    }),
    db.finishedLearning.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        course: true,
      },
    }),
  ];

  const [NotStartedCourses, currentlyLearningCourses, FinishedLearningCourses] =
    await Promise.all(promises);

  const pendingCourses: DragCourseType[] = NotStartedCourses.map(
    (progress) => ({
      id: progress.id,
      name: progress.course.name,
      courseId: progress.courseId,
      category: "pending",
    })
  );

  const currentlyLearning: DragCourseType[] = currentlyLearningCourses.map(
    (progress) => ({
      id: progress.id,
      name: progress.course.name,
      courseId: progress.courseId,
      category: "watching",
    })
  );

  const finishedLearning: DragCourseType[] = FinishedLearningCourses.map(
    (progress) => ({
      id: progress.id,
      name: progress.course.name,
      courseId: progress.courseId,
      category: "finished",
    })
  );

  return (
    <DragDropProvider>
      <Shell>
        <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
          Progressku
        </h1>
        <div className="space-y-4">
          <CustomSheetCourse>Tambah Pelajaran</CustomSheetCourse>
          <DragContainerClient
            notStartedCourses={pendingCourses}
            currentlyLearningCourses={currentlyLearning}
            finishedLearningCourses={finishedLearning}
          />
        </div>
      </Shell>
    </DragDropProvider>
  );
};

export default ProgressPage;
