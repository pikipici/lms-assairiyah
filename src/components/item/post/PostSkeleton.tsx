import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icons } from "@/components/ui/Custom-UI/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";

const PostSkeleton = ({
  length = { INFINITE_SCROLLING_PAGINATION_RESULTS },
}: {
  length?: any;
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
      {Array.from({ length }).map((_, index) => (
        <SinglePostSkeleton key={index} />
      ))}
    </div>
  );
};

export default PostSkeleton;

export const SinglePostSkeleton = () => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h mt-1 text-xs text-gray-500">
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="relative max-h-40 w-full overflow-clip">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 p-4 sm:px-6">
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};
