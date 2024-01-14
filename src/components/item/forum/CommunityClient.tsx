"use client";
import dynamic from "next/dynamic";

import { ExtendedCommunity } from "@/types/db";
import { Skeleton } from "@/components/ui/skeleton";
import ComPostSkeleton from "./ComPostSkeleton";

const Communities = dynamic(
  () => import("@/components/item/forum/Communities"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-y-4">
        <Skeleton className="h-10 w-full" />
        <ComPostSkeleton />
      </div>
    ),
  }
);

interface CommunitiesProps {
  initialCommunities: ExtendedCommunity[];
  category?: string;
}

const CommunityClient = ({
  initialCommunities,
  category,
}: CommunitiesProps) => {
  return (
    <Communities initialCommunities={initialCommunities} category={category} />
  );
};

export default CommunityClient;
