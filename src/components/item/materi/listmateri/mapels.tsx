"use client";

import { Suspense } from "react";
import { RiReactjsLine, RiHtml5Fill } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { HiTerminal } from "react-icons/hi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AsideLink } from "@/components/ui/aside-link";
import { FadeInStagger, FadeIn } from "@/components/ui/fade-in";
import { Mapel } from "@prisma/client";
import { MapelsItem } from "./mapels-item";

interface MapelsProps {
  items: Mapel[];
}

export const Mapels = ({ items }: MapelsProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="item-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="border-b border-lines px-5 py-2.5 text-left">
          Mata Pelajaran
        </AccordionTrigger>
        <AccordionContent className="mt-5 space-y-1">
          <FadeInStagger faster>
            {items.map((Item, idx) => (
              <FadeIn key={idx}>
                <Suspense fallback={<>Loading...</>}>
                  <MapelsItem value={Item.id} label={Item.name} />
                  {/* <AsideLink
                          href={listItem.href}
                          startWith="/projects"
                          title={listItem.title}
                        >
                          {listItem.icon}
                          {listItem.title}
                        </AsideLink> */}
                </Suspense>
              </FadeIn>
            ))}
          </FadeInStagger>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
