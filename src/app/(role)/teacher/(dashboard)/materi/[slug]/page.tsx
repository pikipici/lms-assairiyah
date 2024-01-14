import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { IconBadge } from "@/components/ui/Custom-UI/Icon-badge";
import { getAuthSession } from "@/lib/auth";
import { File } from "lucide-react";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Actions } from "@/components/item/actions";
import { Banner } from "@/components/ui/Custom-UI/Banner";
import { TitleForm } from "@/components/item/teacher/materi/id/title-form";
import { DescriptionForm } from "@/components/item/teacher/materi/id/description-form";
import { ImageForm } from "@/components/item/teacher/materi/id/image-form";
import { MapelForm } from "@/components/item/teacher/materi/id/mapel-form";
import { formatMapel } from "@/lib/utils";
import { KelasForm } from "@/components/item/teacher/materi/id/kelas-form";
import { ChaptersForm } from "@/components/item/teacher/materi/id/chapters-form";
import { AttachmentForm } from "@/components/item/teacher/materi/id/attachment-form";

const CoursePage = async ({ params }: { params: { slug: string } }) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const teacherId = session.user.id;

  const course = await db.course.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      mapel: true,
    },
  });

  const mapel = await db.mapel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const tingkat = await db.tingkat.findMany({
    orderBy: {
      name: "desc",
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  const formattedMapel = formatMapel(course.mapel!.name, true);

  const titleCourse = course.title;

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.mapelId,
    course.kelasId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} dari ${totalFields} terisi)`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <ShellMenu>
      <div className="mt-10">
        <div className="flex-col">
          <div className="flex-1 space-y-2 pl-2">
            <div>
              {!course.isPublished && (
                <Banner label="Materi pembelajaran ini belum dipublikasi,  Tidak akan terlihat oleh peserta didik." />
              )}
              <div className="flex items-center justify-between mb-5">
                <div className="flex flex-col gap-y-2">
                  <Heading
                    title={`Materi Pembelajaran (${titleCourse})`}
                    description="Kelola Materi Pembelajaran"
                  />
                  <span className="text-sm text-slate-700">
                    Isi semua field {completionText}
                  </span>
                </div>
                <Actions
                  disabled={!isComplete}
                  courseId={params.slug}
                  isPublished={course.isPublished}
                  teachersId={teacherId}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 mb-10">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard} />
                    <h2 className="text-xl">Kelola Materi</h2>
                  </div>
                  <TitleForm initialData={course} courseId={course.id} />
                  <DescriptionForm initialData={course} courseId={course.id} />
                  <ImageForm initialData={course} courseId={course.id} />
                  <MapelForm
                    initialData={course}
                    courseId={course.id}
                    mapelName={formattedMapel}
                    options={mapel.map((m) => ({
                      label: m.name,
                      value: m.id,
                    }))}
                  />
                  <KelasForm
                    initialData={course}
                    courseId={course.id}
                    options={tingkat.map((m) => ({
                      label: m.name,
                      value: m.id,
                    }))}
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={ListChecks} />
                      <h2 className="text-xl">Pembahasan Materi</h2>
                    </div>
                    <ChaptersForm
                      initialData={course}
                      courseId={course.id}
                      teachersId={teacherId}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={File} />
                      <h2 className="text-xl">File dan Bahan Ajar</h2>
                    </div>
                    <AttachmentForm initialData={course} courseId={course.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default CoursePage;
