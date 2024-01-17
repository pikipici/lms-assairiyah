import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { ForumClient } from "@/components/item/teacher/forum/client";
import { ForumColumn } from "@/components/item/teacher/forum/columns";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

moment.locale("id");

const ForumPage = async ({ params }: { params: { teachersId: string } }) => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  const teacherId = session.user.id;

  const forum = await db.subreddit.findMany({
    where: {
      creatorId: teacherId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      posts: true,
      subscribers: true,
      Creator: true,
    },
  });

  const formattedForum: ForumColumn[] = forum.map((item) => ({
    id: item.id,
    name: item.name,
    creator: item.Creator?.name,
    posts: item.posts.length,
    subscriber: item.subscribers.length,
    createdAt: moment(item.createdAt).format("LL"),
    Forum: item,
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <ForumClient data={formattedForum} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default ForumPage;
