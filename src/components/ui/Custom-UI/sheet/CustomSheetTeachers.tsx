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

const AddTeachers = dynamic(() => import("@/components/form/addTeachers"), {
  ssr: false,
  loading: () => <ProgresslistFormSkeleton />,
});
interface CustomSheetProps {
  children: ReactNode;
}

const CustomSheetTeachers: FC<CustomSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ size: "sm" }), "w-fit")}>
        {children}
      </SheetTrigger>
      <SheetContent
        side={"top"}
        className="w-[400px] sm:w-[540px] justify-center items-center mx-auto"
      >
        <div>
          <SheetHeader>
            <SheetTitle>Tambah guru</SheetTitle>
            <SheetDescription>
              Masukkan nama guru yang ingin ditambahkan.
            </SheetDescription>
          </SheetHeader>
          <AddTeachers />
          <SheetFooter>
            <SheetClose asChild>
              <Button form="add-teacher-form" type="submit" size="sm">
                Simpan
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheetTeachers;

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
