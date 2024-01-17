import { Mapel, Course, Tingkat } from "@prisma/client";
import {
  FadeInStagger,
  FadeIn,
  AnimatePresence,
} from "@/components/ui/fade-in";

import ListMateri from "./card-page";
import { CourseWithProgressWithMapel } from "@/app/actions/get-courses";

interface CoursesListProps {
  items: CourseWithProgressWithMapel[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <FadeInStagger className="grid md:grid-cols-2 gap-5 p-5" faster>
        <AnimatePresence mode="wait">
          {items.map((item) => (
            <ListMateri
              key={item.id}
              name={item.name}
              description={item.description!}
              mapel={item.mapel!.name}
              tingkat={item.tingkat!.name}
              title={item.title}
            />
          ))}
        </AnimatePresence>
      </FadeInStagger>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
