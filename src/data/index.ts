import { SidebarNavType } from "@/types/item-type";
import { Icons } from "@/components/ui/Custom-UI/Icon";

export const communitySidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "Semua Forum",
    Icon: Icons.umum,
    href: "/forum",
  },
  {
    id: 2,
    label: "Kelas",
    Icon: Icons.kelas,
    href: "/forum/kelas",
  },
  {
    id: 3,
    label: "Ekstrakulikuler",
    Icon: Icons.olahraga,
    href: "/forum/ekstrakulikuler",
  },
];

export const AdminSidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "Menu1",
    Icon: Icons.laptop,
    href: "/community",
  },
  {
    id: 2,
    label: "Menu2",
    Icon: Icons.laptop,
    href: "/community",
  },
  {
    id: 3,
    label: "Menu3",
    Icon: Icons.laptop,
    href: "/community",
  },
];

export const adminSidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "Users",
    Icon: Icons.user,
    href: "/admin/users",
  },
  {
    id: 2,
    label: "Anime",
    Icon: Icons.anime,
    href: "/admin/anime",
  },
  {
    id: 3,
    label: "Admins",
    Icon: Icons.crown,
    href: "/admin",
  },
];

export const pollSidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "Polling",
    Icon: Icons.activity,
    href: "/polling",
  },
  {
    id: 2,
    label: "Hasil Polling",
    Icon: Icons.info,
    href: "/polling/results",
  },
];
