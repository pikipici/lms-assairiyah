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

moment.locale("id");
// import { generateSEO } from '@/lib/generateSEO'
// import { ENV } from '@/lib/constants'

interface SearchPageProps {
  params: {
    slug: string;
  };
}

// const title = 'articles'
// const description =
//   "Embark on a journey through a diverse collection of articles, ranging from React deep-dives to engaging non-technical discussions. Whether you're exploring the entire repository or seeking insights on a specific tag, our articles cover a spectrum of topics to cater to both technical enthusiasts and those looking for non-technical perspectives. Discover thought-provoking content and immerse yourself in the world of insights and ideas."
// const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/articles`
// const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

// export const metadata = generateSEO(title, description, image, url)

export const metadata = {
  title: "Materi Pembelajaran",
};

export default async function ListMateri({ params }: SearchPageProps) {
  // const { tag } = searchParams
  // let filteredArticles = tag ? allArticles.filter(articles => articles.tag.includes(tag)) : allArticles
  const session = await getAuthSession();
  if (!session) {
    redirect("/guest");
  }

  const studentId = session.user.id;
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      mapelId: params.slug,
    },
    include: {
      mapel: true,
      tingkat: true,
      chapters: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const fixcourses: CourseWithProgressWithMapel[] = await Promise.all(
    courses.map(async (course) => {
      const progressPercentage = await getProgress(studentId, course.id);

      return {
        ...course,
        progress: progressPercentage,
      };
    })
  );

  if (!fixcourses.length) {
    return <div>materi tidak ditemukan</div>;
  }

  return (
    <FadeInStagger className="grid md:grid-cols-2 gap-5 p-5" faster>
      <AnimatePresence mode="wait">
        {fixcourses.map((course) => (
          <FadeIn
            layout
            key={course.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-max hover:shadow-lg hover:shadow-secondary">
              <CardHeader className="p-5">
                <CardTitle>
                  <Link
                    href={`/listmateri/${formatUrl(course.name)}`}
                    className="leading-normal"
                  >
                    {course.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0 px-5 text-lg text-muted-foreground line-clamp-4">
                <p className="text-justify">{course.description}</p>
              </CardContent>
              <CardFooter className="p-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-x-1">
                    <p className="text-sm text-muted-foreground">
                      Untuk Tingkat :{course.tingkat?.name}
                    </p>
                    {/* <Badge variant={"default"}>{course.tingkat?.name}</Badge> */}
                  </div>
                  {/* <p className="text-sm font-bold text-muted-foreground hidden md:block">
                    {moment(course.createdAt).format("LL")}
                  </p> */}
                  <div className="flex items-center gap-x-1">
                    <p className="text-sm text-muted-foreground">
                      Mata Pelajaran:{" "}
                    </p>
                    <Badge variant={"default"}>{course.mapel?.name}</Badge>
                  </div>
                </div>
                <Button variant="outline" className="ml-auto" asChild>
                  <Link
                    href={`/detailmateri/${formatUrl(course.name)}`}
                    className="leading-normal"
                  >
                    {course.progress}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        ))}
      </AnimatePresence>
    </FadeInStagger>
  );
}
