import Link from "next/link";
import dynamic from "next/dynamic";

import { getAuthSession } from "@/lib/auth";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { navItemType } from "@/types/item-type";
import { db } from "@/lib/db";
import UserNavmenu from "@/components/item/admin/UserNavmenu";
import { redirect } from "next/navigation";

const MobileNav = dynamic(() => import("@/components/navigation/MobileNav"));

const Navbar = async () => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const getUser = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const navItems: navItemType[] = [
    {
      id: 1,
      label: "Data Informasi Web",
      href: "/admin",
    },
    {
      id: 2,
      label: "Semua Postingan",
      href: "/admin/post",
    },
    {
      id: 3,
      label: "Daftar Forum",
      href: "/admin/forum",
    },
    {
      id: 4,
      label: "Daftar Polling",
      href: "/admin/polling",
    },
    {
      id: 5,
      label: "Daftar Pendidik",
      href: "/admin/teacherlist",
    },
    {
      id: 6,
      label: "Daftar Murid",
      href: "/admin/studentlist",
    },
    {
      id: 8,
      label: "Daftar Kelas",
      href: "/admin/kelas",
    },
    {
      id: 9,
      label: "Daftar Kelas",
      href: "/admin/kelas",
    },
    {
      id: 10,
      label: "Mata Pelajaran",
      href: "/admin/mapel",
    },
    {
      id: 11,
      label: "Daftar Event Sekolah",
      href: "/admin/events",
    },
  ];

  return (
    <div className="sticky top-0 z-40 w-full bg-background flex justify-between lg:space-around items-center py-3 border-b px-8 lg:px-16">
      <MobileNav
        mainNavItems={navItems}
        session={session}
        initialData={getUser}
      />
      <div className="w-full lg:flex hidden gap-x-8 items-center">
        <div className="relative z-20 flex items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Icons.admin className="w-8 h-8" />
            <p className="hidden text-zinc-700 text-sm font-medium md:block">
              Menu Admin
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-x-4"></div>
      </div>
      <div className="flex gap-x-4 items-center">
        <UserNavmenu user={session.user} initialData={getUser} />
      </div>
    </div>
  );
};

export default Navbar;
