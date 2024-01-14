import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ComPostSkeleton = ({ length = 5 }: { length?: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <Card className="flex h-full flex-col" key={index}>
          <CardHeader className="flex-1 py-5">
            <CardTitle>
              <div className="flex gap-2.5">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2.5 w-full">
                  <Skeleton className="h-4 w-1/2 md:w-1/3" />
                  <Skeleton className="h-4 w-full md:w-1/2" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};

export default ComPostSkeleton;
