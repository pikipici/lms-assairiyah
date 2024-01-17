import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { IconBadge } from "@/components/ui/Custom-UI/Icon-badge";
import { getAuthSession } from "@/lib/auth";
import {
  LayoutDashboard,
  UserSquare,
  ListChecks,
  Image,
  UserSquare2,
} from "lucide-react";
import { redirect } from "next/navigation";
import { NameForm } from "@/components/form/teacherid/name-form";
// import { DescriptionForm } from "./_components/description-form";
// import { ImageForm } from "./_components/image-form";
// import { MapelForm } from "./_components/mapel-form";
import { File } from "lucide-react";
// import { AttachmentForm } from "./_components/attachment-form";
// import { ChaptersForm } from "./_components/chapters-form";
import { Heading } from "@/components/ui/Custom-UI/Heading";
// import { Actions } from "./_components/actions";
import { Banner } from "@/components/ui/Custom-UI/Banner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NipForm } from "@/components/form/teacherid/nip-form";
// import { AddressForm } from "@/components/admin/forms/address-form";
// import { NipForm } from "@/components/admin/forms/nip-form";
// import { KtpForm } from "@/components/admin/forms/ktp-form";
import { ImageTeacherForm } from "@/components/form/teacherid/image-form";
import { AddressForm } from "@/components/form/users/address-form";
// import { NuptkForm } from "@/components/admin/forms/nuptk-form";
// import { MapelTeacherForm } from "@/components/form/teacherid/image-form";

// =====================================================
// import { PlaceForm } from "./_components/placebirth-form";
// import { BirthForm } from "./_components/datebirth-form";
// import { ImageStudentForm } from "./_components/image-form";
// import { StudentAttachmentForm } from "./_components/attachment-form";
// import { ReligionForm } from "./_components/r-form";
// import { KelasForm } from "./_components/kelas-form";
// import { AddressForm } from "./_components/address-form";

const Page = async ({
  params,
}: {
  params: { adminId: string; teacherId: string };
}) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const users = await db.user.findUnique({
    where: {
      id: params.teacherId,
    },
    include: {
      connectionMapel: {
        include: {
          mapel: true,
        },
      },
    },
  });

  const role = [
    {
      id: 1,
      name: "ADMIN",
    },
    {
      id: 2,
      name: "TEACHER",
    },
    {
      id: 3,
      name: "STUDENT",
    },
  ];

  const mapel = await db.mapel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!users) {
    return <div>Course not found</div>;
  }

  const kelas = await db.kelas.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <div>
              <div className="sticky top-0 flex items-center justify-between mb-6">
                <div className="flex flex-col gap-y-2">
                  <Link
                    href={`/admin/teacherlist`}
                    className="flex items-center text-sm hover:opacity-75 transition mb-6"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali ke Menu Admin
                  </Link>
                  <Heading
                    title={`Edit Data Guru`}
                    description="Kelola Data Guru"
                  />
                  <span className="text-sm text-slate-700"></span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-10">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={UserSquare2} />
                    <h2 className="text-xl">Data Guru</h2>
                  </div>
                  {/* image */}
                  <NipForm initialData={users} userId={users.id} />
                  <NameForm initialData={users} userId={users.id} />
                  <AddressForm initialData={users} userId={users.id} />
                  {/* 
                  <NuptkForm initialData={users} userId={users.id} />

                  <KtpForm initialData={users} userId={users.id} />
                  <NameForm initialData={users} teacherId={users.id} />
                  <AddressForm initialData={users} userId={users.id} /> */}

                  {/* ========================================== */}
                  {/* <MapelTeacherForm
                    initialData={users!}
                    options={mapel.map((m) => ({
                      label: m.name,
                      value: m.id,
                    }))}
                  /> */}

                  {/* no whatsapp */}

                  {/* <PlaceForm initialData={users} studentId={users.id} />
                  <BirthForm initialData={users} studentId={users.id} />
                  <AddressForm initialData={users} studentId={users.id} />
                  <KelasForm
                    initialData={users}
                    studentId={users.id}
                    options={kelas.map((m) => ({
                      label: m.name,
                      value: m.id,
                    }))}
                  /> */}
                  {/* <ReligionForm initialData={users} studentId={users.id} /> */}

                  {/* <DescriptionForm initialData={course} courseId={course.id} />
                  <ImageForm initialData={course} courseId={course.id} />
                  <MapelForm
                    initialData={course}
                    courseId={course.id}
                    options={mapel.map((m) => ({
                      label: m.name,
                      value: m.id,
                    }))}
                  /> */}
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={Image} />
                      <h2 className="text-xl">Foto Guru</h2>
                    </div>

                    <ImageTeacherForm initialData={users} userId={users.id} />
                    {/* <ChaptersForm
                      initialData={course}
                      courseId={course.id}
                      teachersId={params.teachersId}
                    /> */}
                  </div>
                  {/* 
                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={File} />
                      <h2 className="text-xl">Berkas Pribadi</h2>
                    </div>
                    <StudentAttachmentForm
                      initialData={users}
                      studentId={users.id}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default Page;
