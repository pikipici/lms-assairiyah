import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { PostClient } from "@/components/item/teacher/post/client";
import { PostColumn } from "@/components/item/teacher/post/columns";
import moment from "moment";
import "moment/locale/id";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

moment.locale("id");

const PostsPage = async () => {
  const session = await getAuthSession();
  if (!session) return redirect("/guest");

  const posts = await db.post.findMany({
    where: {
      authorId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      subreddit: true,
    },
  });

  const formattedPosts: PostColumn[] = posts.map((item) => ({
    id: item.id,
    title: item.title,
    authorId: item.authorId,
    forum: item.subreddit.name,
    createdAt: moment(item.createdAt).format("LL"),
    author: item.author.username,
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <PostClient data={formattedPosts} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default PostsPage;
