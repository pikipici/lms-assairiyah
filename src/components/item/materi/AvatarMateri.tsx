"use client";

import { User } from "next-auth";
import { User as DataUser } from "@prisma/client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Icons } from "@/components/ui/Custom-UI/Icon";

interface UserAccountNavProps {
  user: Pick<User, "id" | "name" | "email" | "image">;
  initialData: DataUser | null;
}

const AvatarMateri: FC<UserAccountNavProps> = ({ user, initialData }) => {
  const roleMenu =
    initialData?.role === "ADMIN" ? (
      <DropdownMenuItem asChild>
        <Link href={`/admin/${user?.id}`}>
          <div className="flex items-center gap-x-2">
            <Icons.admin className="h-4 w-4" />
            Menu Admin
          </div>
        </Link>
      </DropdownMenuItem>
    ) : initialData?.role === "TEACHER" ? (
      <DropdownMenuItem asChild>
        <Link href={`/teachers/${user?.id}`}>
          <div className="flex items-center gap-x-2">
            <Icons.guru className="h-4 w-4" />
            Menu Pendidik
          </div>
        </Link>
      </DropdownMenuItem>
    ) : (
      <></>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {roleMenu}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href={`/`}>
            <div className="flex items-center gap-x-2">
              {/* <Icons.profile className="h-4 w-4" /> */}
              Kembali ke beranda
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMateri;
