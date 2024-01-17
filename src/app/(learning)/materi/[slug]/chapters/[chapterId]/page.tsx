import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/app/actions/get-chapter";
import { Banner } from "@/components/ui/Custom-UI/Banner";
import { Separator } from "@/components/ui/separator";
import { PreviewTx } from "@/components/Preview-tx";

import { VideoPlayer } from "@/components/item/materi/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "@/components/item/materi/course-progress-button";
import { getAuthSession } from "@/lib/auth";
import { Text } from "@chakra-ui/react";

const ChapterIdPage = async ({
  params,
}: {
  params: { slug: string; chapterId: string };
}) => {
  const session = await getAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, attachments, nextChapter, userProgress } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.slug,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const completeOnEnd = !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="Kamu sudah menyelesaikan pembahasan ini."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            userId={userId}
            chapterId={params.chapterId}
            title={chapter.title}
            videoUrl={chapter.videoUrl}
            courseId={params.slug}
            nextChapterId={nextChapter?.id}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            <CourseProgressButton
              userId={userId}
              chapterId={params.chapterId}
              courseId={params.slug}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          </div>
          <Separator />
          <div className="py-2.5">
            <Text fontSize="lg">{course.description!}</Text>
            {/* <PreviewTx value={chapter.description!} /> */}
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
