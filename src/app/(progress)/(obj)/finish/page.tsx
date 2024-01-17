import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FadeInStagger,
  FadeIn,
  AnimatePresence,
} from "@/components/ui/fade-in";
import { db } from "@/lib/db";
import Balancer from "react-wrap-balancer";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import {
  CourseWithProgressWithMapel,
  getCourses,
} from "@/app/actions/get-courses";
import { getAuthSession } from "@/lib/auth";
import { formatUrl } from "@/lib/utils";
import { redirect } from "next/navigation";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";
import { getProgress } from "@/app/actions/get-progress";
import { getDashboardCourses } from "@/app/actions/get-dashboard-courses";
import { CardPage } from "@/app/(card)/(materi)/listmateri/card-page";

moment.locale("id");
// import { generateSEO } from '@/lib/generateSEO'
// import { ENV } from '@/lib/constants'

interface SearchPageProps {}

export const metadata = {
  title: "Materi Pembelajaran",
};

export default async function ListMateri() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/guest");
  }

  const studentId = session.user.id;
  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    studentId
  );

  return (
    <FadeInStagger className="grid md:grid-cols-2 gap-5 p-5" faster>
      <AnimatePresence mode="wait">
        {completedCourses.map((course) => (
          <CardPage
            key={course.id}
            name={course.name}
            description={course.description}
            title={course.title}
            mapel={course.mapel.name}
            tingkat={course.tingkat.name}
            progress={course.progress}
          />
        ))}
      </AnimatePresence>
    </FadeInStagger>
  );
}
