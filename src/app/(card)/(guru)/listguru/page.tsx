// import { ProjectCard } from '@/components/molecules/project-card'
import {
  TeachersCard,
  TeachersCardProps,
} from "@/components/item/teacher/teacher-card";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type SearchParamsProps = {
  searchParams: {
    tag: string;
  };
};

export default async function ProjectPage({ searchParams }: SearchParamsProps) {
  //   const { tag } = searchParams
  //   let filteredProjects = tag ? allProjects.filter(project => project.tag.includes(tag)) : allProjects
  const session = await getAuthSession();
  if (!session) {
    return redirect("/guest");
  }

  const getTeachers = await db.user.findMany({
    where: {
      role: "TEACHER",
    },
  });

  // const formattedData: TeachersCardProps[] = getTeachers.map((Teacher) => ({
  //   id: Teacher.id,
  //   name: Teacher.name,
  //   image: Teacher.image,
  // }));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
      {getTeachers.map((Teacher) => (
        // <FadeIn
        //   layout
        //   key={Teacher.name}
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   exit={{ opacity: 0 }}
        //   transition={{ duration: 0.3 }}
        // >
        <TeachersCard
          key={Teacher.id}
          id={Teacher.id}
          name={Teacher.name}
          image={Teacher.image}
        />
        // </FadeIn>
      ))}
    </div>

    // <FadeInStagger
    //   className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5"
    //   faster
    // >
    //   <AnimatePresence mode="wait">
    //     {getTeachers.map((Teacher) => (
    //       <FadeIn
    //         layout
    //         key={Teacher.name}
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ duration: 0.3 }}
    //       >
    //         <TeachersCard
    //           id={Teacher.id}
    //           name={Teacher.name}
    //           image={Teacher.image}
    //         />
    //       </FadeIn>
    //     ))}
    //   </AnimatePresence>
    // </FadeInStagger>
  );
}
