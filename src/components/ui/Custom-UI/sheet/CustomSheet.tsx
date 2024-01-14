"use client";
import { FC, ReactNode } from "react";
import dynamic from "next/dynamic";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "next-auth";
import { User as DataUser } from "@prisma/client";

const AddAnimeWatchlistForm = dynamic(
  () => import("@/components/form/MenuNavigator"),
  {
    ssr: false,
    loading: () => <WatchlistFormSkeleton />,
  }
);

interface CustomSheetProps {
  children: ReactNode;
  user: Pick<User, "id" | "name" | "email" | "image">;
  initialData: DataUser | null;
}

const CustomSheet: FC<CustomSheetProps> = ({ children, user, initialData }) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(buttonVariants({ size: "sm" }), "w-full mt-4")}
      >
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between overflow-y-auto">
        <div>
          <SheetHeader className="mb-10">
            <SheetTitle>Menu Navigasi</SheetTitle>
            <SheetDescription>
              Menu yang tersedia akan menyesuaikan berdasarkan role yang
              dimiliki user.
            </SheetDescription>
          </SheetHeader>
          <AddAnimeWatchlistForm user={user} initialData={initialData} />
        </div>
        <div className="mt-auto">
          <SheetDescription className="text-xs">
            Catatan: Jika ada menu yang tidak sesuai atau tidak bisa di akses
            harap hubungi admin sekolah.
          </SheetDescription>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;

const WatchlistFormSkeleton = () => {
  return (
    <div className="grid gap-5 my-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-2/3 md:w-[200px]" />
      </div>
    </div>
  );
};
