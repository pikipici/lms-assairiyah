import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OverviewSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-24">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Postingan</CardTitle>
          <Icons.post className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5 mt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Forum</CardTitle>
          <Icons.forum className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5 mt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total User</CardTitle>
          <Icons.anggota className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5 mt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
          <Icons.kelas className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5 mt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Mata Pelajaran
          </CardTitle>
          <Icons.mapel className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5 mt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Materi Pembelajaran
          </CardTitle>
          <Icons.course className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5 mt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSkeleton;
