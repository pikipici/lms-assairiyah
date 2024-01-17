import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { PollingClient } from "@/components/item/admin/polling/client";
import { PollingColumn } from "@/components/item/admin/polling/columns";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

moment.locale("id");

const PollingPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }

  const userId = session.user.id;

  const polling = await db.poll.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      option: {
        include: {
          vote: true,
        },
      },
      creator: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_BROWSE,
    where: {
      expiresAt: {
        gt: new Date(), // only show polls that haven't expired yet
      },
      creatorId: userId,
    },
  });

  const formattedPolling: PollingColumn[] = polling.map((item) => ({
    id: item.id,
    question: item.question,
    creator: item.creator.name,
    expiresAt: moment(item.expiresAt).format("LL"),
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <PollingClient data={formattedPolling} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default PollingPage;
