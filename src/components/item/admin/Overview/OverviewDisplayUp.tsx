import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewType } from "@/types/item-type";
import { Icons } from "@/components/ui/Custom-UI/Icon";

const OverviewDisplayUp = ({ data }: { data: OverviewType[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {data.map((item, index) => {
        const Icon =
          item.category === "Post"
            ? Icons.post
            : item.category === "Forum"
            ? Icons.forum
            : item.category === "User"
            ? Icons.anggota
            : item.category === "Kelas"
            ? Icons.kelas
            : item.category === "Mapel"
            ? Icons.mapel
            : Icons.course;

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.count}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OverviewDisplayUp;
