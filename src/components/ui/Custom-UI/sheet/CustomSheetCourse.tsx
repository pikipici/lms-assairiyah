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

const AddCourselistForm = dynamic(
  () => import("@/components/form/AddCourseListForm"),
  {
    ssr: false,
    loading: () => <ProgresslistFormSkeleton />,
  }
);
interface CustomSheetProps {
  children: ReactNode;
}

const CustomSheetCourse: FC<CustomSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ size: "sm" }), "w-fit")}>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between overflow-y-auto">
        <div>
          <SheetHeader>
            <SheetTitle>
              Tambah materi pembelajaran ke dalam ProgressKu
            </SheetTitle>
            <SheetDescription>
              Tambah materi ke ProgressKu dengan memilih lalu klik simpan.
            </SheetDescription>
          </SheetHeader>
          <AddCourselistForm />
          <SheetFooter>
            <SheetClose asChild>
              <Button form="course-progress-form" type="submit" size="sm">
                Simpan
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
        <div className="mt-auto">
          <SheetDescription className="text-xs">
            Catatan: Jika materi sudah berada dalam daftar, maka perintah akan
            diabaikan.
          </SheetDescription>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheetCourse;

const ProgresslistFormSkeleton = () => {
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
