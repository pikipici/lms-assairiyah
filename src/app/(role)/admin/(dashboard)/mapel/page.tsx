import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { MapelClient } from "@/components/item/admin/mapel/client";
import { MapelColumn } from "@/components/item/admin/mapel/columns";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const MapelPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  const adminId = session.user.id;

  const mapel = await db.mapel.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      courses: true,
    },
  });

  const formattedMapels: MapelColumn[] = mapel.map((item) => ({
    id: item.id,
    name: item.name,
    courses: item.courses.length,
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <MapelClient data={formattedMapels} adminId={adminId} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default MapelPage;
