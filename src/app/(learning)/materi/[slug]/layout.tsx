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
import { File } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { PreviewTx } from "@/components/Preview-tx";
import {
  Avatar,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import Link from "next/link";
import { getProgress } from "@/app/actions/get-progress";
import { CourseProgress } from "@/components/item/materi/course.progress";
import { CourseSidebarItem } from "@/components/item/materi/course-sidebar-item";
import { CircleProgress } from "@/components/item/materi/circle-progress";

export default async function MateriDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const userId = session?.user.id;

  const course = await db.course.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
      attachments: true,
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <section className="grid grid-cols-12 overflow-hidden h-full">
      <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="table-of-contents">
          <AccordionItem value="table-of-contents">
            <AccordionTrigger className="border-b border-lines px-5 py-2.5 text-left">
              {course.title}
            </AccordionTrigger>
            <AccordionContent className="mt-5 space-y-1">
              <FadeInStagger faster>
                {/* {content.headings.map((heading: { text: string; level: string }, i: number) => ( */}
                <FadeIn>
                  <Suspense fallback={<>Loading...</>}>
                    <div className="flex flex-col px-5 py-2.5 gap-2">
                      {course.chapters.map((chapter) => (
                        <div key={chapter.id}>
                          <CourseSidebarItem
                            id={chapter.id}
                            label={chapter.title}
                            isCompleted={
                              !!chapter.userProgress?.[0]?.isCompleted
                            }
                            courseId={course.id}
                          />
                        </div>
                      ))}
                    </div>
                    {/* <div>
                      <h3 className="px-5 py-2.5 text-left text-lg font-bold">
                        Info:{" "}
                      </h3>
                    </div> */}
                    {/* <div className="px-5 py-2.5">
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
                    </div> */}
                  </Suspense>
                </FadeIn>
                {/* ))} */}
              </FadeInStagger>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-10 ml-2 text-center mb-5">
          <div className="mx-auto">
            <CircleProgress variant="success" value={progressCount} />
            {progressCount === 100 ? (
              <Link href="/listmateri">
                <Button colorScheme="teal" size="sm">
                  Kembali
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
        {!!course.attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {course.attachments.map((attachment) => (
                <a href={attachment.url} target="_blank" key={attachment.id}>
                  <Tag size="sm" variant="subtle" colorScheme="cyan">
                    {/* <TagLeftIcon boxSize='12px' as={AddIcon} /> */}
                    <TagLabel>{attachment.name}</TagLabel>
                  </Tag>
                </a>
              ))}
            </div>
          </>
        )}
      </aside>
      <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[83vh] md:h-auto scroll-smooth">
        {children}
      </section>
    </section>
  );
}
