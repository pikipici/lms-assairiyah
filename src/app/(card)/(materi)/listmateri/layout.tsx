import { getCourses } from "@/app/actions/get-courses";
import { Mapels } from "@/components/item/materi/listmateri/mapels";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CoursesList } from "./course-list";

export default async function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  const userId = session.user.id;

  const mapel = await db.mapel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  // const testMenu = searchParams ? (
  //   <>
  //     {" "}
  //     <CoursesList items={courses} />{" "}
  //   </>
  // ) : (
  //   <>{children}</>
  // );

  const tingkat = await db.tingkat.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <>
      <section className="grid grid-cols-12 overflow-hidden h-full">
        <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
          <Mapels items={mapel} />
        </aside>
        <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84vh] md:h-auto">
          {/* {testMenu} */}
          {/* <CoursesList items={courses} /> */}
          {children}
        </section>
      </section>
    </>
  );
}
