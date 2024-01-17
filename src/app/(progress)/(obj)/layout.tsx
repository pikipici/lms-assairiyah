import { cn } from "@/lib/utils";

import { FcApproval, FcLike } from "react-icons/fc";
import { RiReactjsLine, RiHtml5Fill } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { HiTerminal } from "react-icons/hi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in";
import { Suspense } from "react";
import { AsideLink } from "@/components/ui/aside-link";

export const metadata = {
  title: "Forum Madrasah",
  //   description: "testing",
};

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/signin");
  }
  return (
    <section className="grid grid-cols-12 overflow-hidden h-full">
      <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="item-0">
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger
                className="border-b border-lines px-5 py-2.5 text-left"
                data-umami-event="accordion-project"
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="mt-5 space-y-1">
                <FadeInStagger faster>
                  {item.list.map((listItem, j) => (
                    <FadeIn key={j}>
                      <Suspense fallback={<>Loading...</>}>
                        <AsideLink
                          href={listItem.href}
                          startWith="/projects"
                          title={listItem.title}
                        >
                          {listItem.icon}
                          {listItem.title}
                        </AsideLink>
                      </Suspense>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto">
        {children}
      </section>
    </section>
  );
}

const data = [
  {
    title: "Progress Belajar",
    list: [
      {
        title: "Sedang Dipelajari",
        href: "/riwayat",
        icon: <FcLike className="w-4 h-4" />,
      },
      {
        title: "Sudah Selesai",
        href: "/finish",
        icon: <FcApproval className="w-4 h-4" />,
      },
    ],
  },
];
