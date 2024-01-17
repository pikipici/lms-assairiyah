// import { allArticles } from 'contentlayer/generated'
import { Suspense } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FadeInStagger, FadeIn } from "@/components/ui/fade-in";
import { formatUrl } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

import { PreviewTx } from "@/components/Preview-tx";
import {
  Avatar,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import Link from "next/link";
import { getProgress } from "@/app/actions/get-progress";
// import { slugify } from '@/lib/slug'

// async function getContent(params: { slug: string }) {
//   const article = allArticles.find(article => article.slug.toLowerCase() === params.slug)
//   if (!article) null
//   return article
// }

export default async function MateriDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { slug: rawName } = params;
  const name = formatUrl(rawName, true);

  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const userId = session.user.id;

  const course = await db.course.findUnique({
    where: {
      name,
    },
    include: {
      mapel: true,
      tingkat: true,
      chapters: true,
      Creator: true,
    },
  });

  if (!course) {
    notFound();
  }

  const progressPercentage = await getProgress(userId, course.id);

  return (
    <section className="grid grid-cols-12 overflow-hidden h-full">
      <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="table-of-contents">
          <AccordionItem value="table-of-contents">
            <AccordionTrigger className="border-b border-lines px-5 py-2.5 text-left">
              Detail materi pembelajaran
            </AccordionTrigger>
            <AccordionContent className="mt-5 space-y-1">
              <FadeInStagger faster>
                {/* {content.headings.map((heading: { text: string; level: string }, i: number) => ( */}
                <FadeIn>
                  <Suspense fallback={<>Loading...</>}>
                    <div>
                      <h3 className="px-5 py-2.5 text-left text-lg font-bold">
                        Info:{" "}
                      </h3>
                    </div>
                    <div className="px-5 py-2.5">
                      <Tag size="lg" colorScheme="green" borderRadius="full">
                        <Avatar
                          src={course.Creator?.image}
                          size="xs"
                          name={course.Creator?.name}
                          ml={-1}
                          mr={2}
                        />
                        <TagLabel>{course.Creator?.name}</TagLabel>
                      </Tag>
                    </div>
                    <div className="px-5 py-2.5">
                      <Tag size="lg" colorScheme="green" borderRadius="full">
                        <Icons.course className="mr-2 h-4 w-4" />
                        <TagLabel>{course.chapters.length} Pembahasan</TagLabel>
                      </Tag>
                    </div>
                  </Suspense>
                </FadeIn>
                {/* ))} */}
              </FadeInStagger>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-center mt-5">
          <div className="mx-auto">
            <Button
              isLoading={false}
              loadingText="Loading"
              colorScheme={progressPercentage > 0 ? "teal" : "messenger"}
              variant="solid"
              spinnerPlacement="start"
            >
              <Link href={`/materi/${course.id}`}>
                {progressPercentage > 0 ? "Lanjutkan" : "Mulai"}
              </Link>
            </Button>
          </div>
        </div>
      </aside>
      <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[83vh] md:h-auto scroll-smooth">
        <div className="relative mt-5 items-center mx-auto w-2/4 justify-center h-80 bg-slate-200 rounded-md block">
          <Image
            src={course.imageUrl}
            alt={course?.name}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: "cover", // cover, contain, none
            }}
          />
        </div>
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-3xl mx-auto font-bold mb-2">
                {course.title}
              </h2>
              {/* <CourseProgressButton
              userId={params.userId}
              chapterId={params.chapterId}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            /> */}
            </div>
            <Separator className="w-full" />
            <div>
              <div className="mt-5">
                <Text fontSize="lg" alignContent={"center"}>
                  {course.description!}
                </Text>
              </div>
              {/* <PreviewTx value={course.description!} /> */}
            </div>
            {/* {!!attachments.length && (
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
          )} */}
          </div>
        </div>
        {/* <Separator />
        <Preview value={course.description!} /> */}
        {children}
      </section>
    </section>
  );
}
