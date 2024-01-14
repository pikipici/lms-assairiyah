"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC, useState } from "react";

import { navItemType } from "@/types/item-type";
import { useRouter } from "next/navigation";

interface MenuPopover extends React.HTMLAttributes<HTMLDivElement> {}

const MenuAdminPopover: FC<MenuPopover> = ({ className, ...props }) => {
  const router = useRouter();
  const Items: navItemType[] = [
    {
      id: 1,
      label: "Forum Sekolah",
      href: "/forum",
    },
    {
      id: 2,
      label: "Laman Polling",
      href: "/polling",
    },
    {
      id: 3,
      label: "Library Post",
      href: "/savedpost",
    },
    {
      id: 4,
      label: "Kegiatan Sekolah",
      href: "/events",
    },
    {
      id: 5,
      label: "Materi Pembelajaran",
      href: "/",
    },
  ];

  return (
    <div className="grid w-full max-w-xl gap-5 py-4 items-center justify-center">
      {Items.map((item) => {
        return (
          <Link key={item.id} href={item.href}>
            <Button variant="default" className="w-[250px]">
              {item.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuAdminPopover;
