"use client";

import Link from "next/link";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatMapel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface MapelsItemProps {
  label: string;
  value: string;
}

export const MapelsItem = ({ label, value }: MapelsItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentmapelId = searchParams.get("mapelId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentmapelId === value;

  const onClick = () => {
    router.push(`/filter/${value}`);
  };

  const formatlabel = formatMapel(label, true);
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-primary/10",
        "w-full transition-colors flex items-center gap-x-2.5 hover:bg-primary/10 px-5 py-1",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {/* {Icon && <Icon size={20} />} */}
      <div className="truncate">{formatlabel}</div>
    </button>
  );
};
