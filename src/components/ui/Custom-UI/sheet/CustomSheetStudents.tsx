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

const AddStudents = dynamic(() => import("@/components/form/AddStudents"), {
  ssr: false,
  loading: () => <ProgresslistFormSkeleton />,
});
interface CustomSheetProps {
  children: ReactNode;
}

const CustomSheetStudents: FC<CustomSheetProps> = ({ children }) => {
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
            <SheetTitle>Tambah murid</SheetTitle>
            <SheetDescription>
              Masukkan nama murid yang ingin ditambahkan.
            </SheetDescription>
          </SheetHeader>
          <AddStudents />
          <SheetFooter>
            <SheetClose asChild>
              <Button form="add-student-form" type="submit" size="sm">
                Simpan
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheetStudents;

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
