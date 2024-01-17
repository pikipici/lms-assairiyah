import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { KelasClient } from "@/components/item/admin/kelas/client";
import { KelasColumn } from "@/components/item/admin/kelas/columns";
import { format } from "date-fns";
import id from "date-fns/locale/id";

const PostsPage = async ({ params }: { params: { adminId: string } }) => {
  const kelas = await db.kelas.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      courses: true,
      User: true,
    },
  });

  const formattedKelass: KelasColumn[] = kelas.map((item) => ({
    id: item.id,
    name: item.name,
    courses: item.courses.length,
    user: item.User.length,
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <KelasClient data={formattedKelass} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default PostsPage;
