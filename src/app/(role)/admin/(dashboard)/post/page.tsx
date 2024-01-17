import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { PostClient } from "@/components/item/admin/post/client";
import { PostColumn } from "@/components/item/admin/post/columns";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

const PostsPage = async () => {
  const posts = await db.post.findMany({
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
