"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { cn } from "@/lib/utils";
import { SidebarNavType } from "@/types/item-type";

const TeacherSidebar = () => {
  const pathname = usePathname();
  const params = useParams();
  const Items: SidebarNavType[] = [
    {
      id: 1,
      label: "Data Guru",
      Icon: Icons.laptop,
      href: `/teacher`,
    },
    {
      id: 2,
      label: "Postingan Anda",
      Icon: Icons.onepost,
      href: `/teacher/post`,
    },
    {
      id: 3,
      label: "Forum Anda",
      Icon: Icons.forum,
      href: `/teacher/forum`,
    },
    {
      id: 4,
      label: "Daftar Siswa",
      Icon: Icons.anggota,
      href: `/teacher/studentlist`,
    },
    {
      id: 5,
      label: "Daftar Kelas",
      Icon: Icons.kelas,
      href: `/teacher/kelas`,
    },
    {
      id: 6,
      label: "Materi Anda",
      Icon: Icons.course,
      href: `/teacher/materi`,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      {Items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="focus:outline-none group"
        >
          <span
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground group-focus:bg-muted group-focus:text-foreground group-focus:font-medium transition-all",
              pathname === item.href
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>{item.label}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default TeacherSidebar;
