"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { cn } from "@/lib/utils";
import { SidebarNavType } from "@/types/item-type";

const AdminSidebar = () => {
  const pathname = usePathname();
  const Items: SidebarNavType[] = [
    {
      id: 1,
      label: "Data Informasi Web",
      Icon: Icons.laptop,
      href: `/admin`,
    },
    {
      id: 2,
      label: "Semua Postingan",
      Icon: Icons.post,
      href: `/admin/post`,
    },
    {
      id: 3,
      label: "Daftar Forum",
      Icon: Icons.community,
      href: `/admin/forum`,
    },
    {
      id: 4,
      label: "Daftar Polling",
      Icon: Icons.polling,
      href: `/admin/polling`,
    },

    {
      id: 5,
      label: "Daftar Pendidik",
      Icon: Icons.guru,
      href: `/admin/teacherlist`,
    },
    {
      id: 6,
      label: "Daftar Murid",
      Icon: Icons.anggota,
      href: `/admin/studentlist`,
    },
    {
      id: 7,
      label: "Daftar Kelas",
      Icon: Icons.kelas,
      href: `/admin/kelas`,
    },
    {
      id: 8,
      label: "Mata Pelajaran",
      Icon: Icons.mapel,
      href: `/admin/mapel`,
    },
    {
      id: 9,
      label: "Daftar Event Sekolah",
      Icon: Icons.calendar,
      href: `/admin/events`,
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

export default AdminSidebar;
