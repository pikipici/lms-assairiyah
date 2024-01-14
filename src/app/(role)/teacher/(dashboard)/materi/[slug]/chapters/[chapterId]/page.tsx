import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/ui/Custom-UI/Icon-badge";
import { Banner } from "@/components/ui/Custom-UI/Banner";

import { ChapterTitleForm } from "@/components/item/teacher/materi/chapter/chapter-title-form";
import { ChapterDescriptionForm } from "@/components/item/teacher/materi/chapter/chapter-description-form";

import { ChapterVideoPlayer } from "@/components/item/teacher/materi/chapter/chapter-video-player";
import { ChapterActions } from "@/components/item/teacher/materi/chapter/chapter-actions";
import { getAuthSession } from "@/lib/auth";
const ChapterIdPage = async ({
  params,
}: {
  params: { slug: string; chapterId: string };
}) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const teacherId = session.user.id;

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.slug,
    },
  });

  if (!chapter) {
    return redirect(`/teachers`);
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="mt-10">
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="Pembahasan ini belum dipublish. Tidak akan muncul di halaman materi pembelajaran."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/materi/${params.slug}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke halaman kelola materi pembelajaran
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Kelola Pembahasan</h1>
                <span className="text-sm text-slate-700">
                  Isi semua field {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.slug}
                chapterId={params.chapterId}
                teachersId={teacherId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Kelola pembahasan</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.slug}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.slug}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Video pembahasan</h2>
            </div>
            <ChapterVideoPlayer
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
