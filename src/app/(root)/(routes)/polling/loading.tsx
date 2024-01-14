import { Shell } from "@/components/item/Shell";
import HeaderSkeleton from "@/components/item/Skeleton/HeaderSkeleton";
import PollCardsSkeleton from "@/components/item/Skeleton/PollCardsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const PollLoading = () => {
  return (
    <Shell layout="dashboard">
      <HeaderSkeleton description />
      <Skeleton className="h-8 w-24" />

      <PollCardsSkeleton />
    </Shell>
  );
};

export default PollLoading;
