"use client";

import {
  Calculator,
  Calendar,
  Megaphone,
  CreditCard,
  Settings,
  Smile,
  Users,
} from "lucide-react";

import { Icon, Icons } from "@/components/ui/Custom-UI/Icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC, useState } from "react";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface MenuPopover extends React.HTMLAttributes<HTMLDivElement> {}

interface MenuStudentProps {
  studentId: string;
}

const MenuStudentPopover: FC<MenuStudentProps> = ({ studentId }) => {
  return (
    <Command>
      <CommandList>
        <CommandGroup heading="Pilihan Menu">
          <CommandItem>
            <Link href="/forum">
              <Button type="button" variant="ghost">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="font-bold">Daftar Forum</span>
              </Button>
            </Link>
          </CommandItem>
          <CommandItem>
            <Link href="/forum">
              <Button type="button" variant="ghost">
                <Icons.keep className="mr-2 h-4 w-4" />
                <span className="font-bold">Library Post</span>
              </Button>
            </Link>
          </CommandItem>
          <CommandItem>
            <Link href="/myprogress">
              <Button type="button" variant="ghost">
                <Icons.check className="mr-2 h-4 w-4" />
                <span className="font-bold">My Progress</span>
              </Button>
            </Link>
          </CommandItem>
          <CommandItem>
            <Link href={`/students/${studentId}/listmateri`}>
              <Button type="button" variant="ghost">
                <Icons.mapel className="mr-2 h-4 w-4" />
                <span className="font-bold">Materi Pembelajaran</span>
              </Button>
            </Link>
          </CommandItem>
          <CommandItem>
            <Link href="/">
              <Button type="button" variant="ghost">
                <Megaphone className="mr-2 h-4 w-4" />
                <span className="font-bold">Informasi Penting</span>
              </Button>
            </Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default MenuStudentPopover;
