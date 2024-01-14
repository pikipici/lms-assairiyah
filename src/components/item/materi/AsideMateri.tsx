"use client";

import { RiReactjsLine, RiArticleLine } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Combobox } from "./ComboBox";
import { FC, Suspense, useState } from "react";

import { FadeInStagger, FadeIn } from "@/components/ui/fade-in";

interface AsideMateriProps {
  optionsMapel: { label: string; value: string }[];
  optionsTingkat: { label: string; value: string }[];
}

const AsideMateri: FC<AsideMateriProps> = ({
  optionsMapel,
  optionsTingkat,
}) => {
  const [mapel, setMapel] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [reset, setReset] = useState(false);
  const TAGS = [
    {
      title: "Filter Materi",
      list: [
        {
          title: "All article",
          href: "/articles",
          icon: RiArticleLine,
        },
        {
          title: "React",
          href: "/articles?tag=React",
          icon: RiReactjsLine,
        },
        {
          title: "Non Technical",
          href: "/articles?tag=Non Technical",
          icon: LiaBookSolid,
        },
      ],
    },
  ];

  return (
    <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
      <Accordion type="single" collapsible defaultValue="item-0">
        {TAGS.map((item, i) => (
          <AccordionItem value={`item-${i}`} key={i}>
            <AccordionTrigger className="border-b border-lines px-5 py-2.5 text-left">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="flex mt-5 space-y-1">
              <div className="ml-2 flex flex-col gap-2 sm:items-center">
                <Combobox
                  data={optionsMapel}
                  selectedOption={mapel}
                  setState={setMapel}
                  placeholder="Pilih Mata Pelajaran..."
                  reset={reset}
                  large
                />
                <Combobox
                  data={optionsTingkat}
                  selectedOption={tingkat}
                  placeholder="Pilih Tingkat..."
                  setState={setTingkat}
                  reset={reset}
                  large
                />
              </div>
              {/* <FadeInStagger faster>
                {item.list.map((listItem, j) => (
                  <FadeIn key={j}>
                    <Suspense fallback={<>Loading...</>}>
                      <AsideLink
                        href={listItem.href}
                        startWith="/projects"
                        title={listItem.title}
                      >
                        <listItem.icon className="w-4 h-4" />
                        {listItem.title}
                      </AsideLink>
                    </Suspense>
                  </FadeIn>
                ))}
              </FadeInStagger> */}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default AsideMateri;
