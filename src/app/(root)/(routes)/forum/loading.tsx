import { Shell } from "@/components/item/Shell";
import { Skeleton } from "@/components/ui/skeleton";
import ComPostSkeleton from "@/components/item/forum/ComPostSkeleton";
import HeaderSkeleton from "@/components/item/forum/HeaderSkeleton";

const CommunitiesLoading = () => {
  return (
    <Shell layout="dashboard">
      <HeaderSkeleton large />

      <Skeleton className="h-8 w-24" />

      <div className="flex flex-col gap-y-4">
        <Skeleton className="h-10 w-full" />

        <ComPostSkeleton />
      </div>
    </Shell>
  );
};

export default CommunitiesLoading;
