"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const Icon = isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/materi/${courseId}/chapters/${id}`);
  };

  return (
    <Link href={`/materi/${courseId}/chapters/${id}`}>
      <Tag
        size="md"
        borderRadius="full"
        variant="solid"
        colorScheme={isCompleted ? "green" : "red"}
      >
        <TagLabel> {label}</TagLabel>
      </Tag>
    </Link>

    // <button
    //   onClick={onClick}
    //   type="button"
    //   className={cn(
    //     "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-10",
    //     isActive &&
    //       "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
    //     isCompleted && "text-emerald-700 hover:text-emerald-700",
    //     isCompleted && isActive && "bg-emerald-200/20"
    //   )}
    // >
    //   <div className="flex items-center gap-x-2 py-4">
    //     <Icon
    //       size={22}
    //       className={cn(
    //         "text-slate-500",
    //         isActive && "text-slate-700",
    //         isCompleted && "text-emerald-700"
    //       )}
    //     />
    //     {label}
    //   </div>
    //   <div
    //     className={cn(
    //       "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
    //       isActive && "opacity-100",
    //       isCompleted && "border-emerald-700"
    //     )}
    //   />
    // </button>
  );
};
