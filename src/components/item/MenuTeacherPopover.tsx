"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC, useState } from "react";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { SidebarNavType } from "@/types/item-type";

interface MenuPopover extends React.HTMLAttributes<HTMLDivElement> {}

const MenuTeacherPopover: FC<MenuPopover> = ({ className, ...props }) => {
  const Items: SidebarNavType[] = [
    {
      id: 1,
      label: "Forum Sekolah",
      Icon: Icons.community,
      href: `/forum`,
    },
    {
      id: 2,
      label: "Halaman Polling",
      Icon: Icons.polling,
      href: `/polling`,
    },
    {
      id: 3,
      label: "Forum Anda",
      Icon: Icons.forum,
      href: `/teachers/`,
    },
    {
      id: 4,
      label: "Daftar Siswa",
      Icon: Icons.anggota,
      href: `/teachers/`,
    },
  ];
  return (
    <Command>
      <CommandList>
        <CommandGroup heading="Pilihan Menu">
          {Items.map((item) => (
            <CommandItem key={item.id}>
              <Link href={item.href}>
                <Button type="button" variant="ghost">
                  <item.Icon className="mr-2 h-4 w-4" />
                  <span className="font-bold">{item.label}</span>
                </Button>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default MenuTeacherPopover;
