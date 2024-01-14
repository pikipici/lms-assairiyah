import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { formatUrl, formatTime } from "@/lib/utils";
import PostClient from "@/components/item/post/PostClient";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import BoxForum from "@/components/item/post/BoxForum";

interface LayoutProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: LayoutProps) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/guest");
  }

  const { slug: rawSlug } = params;
  const slug = formatUrl(rawSlug, true);

  const getUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
      Creator: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: slug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      savedby: true,
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subreddit) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  const postsCount = posts.length;

  const roleSession = getUser?.id;
  const roleUser = subreddit.Creator.id;

  const createdForum = subreddit.createdAt.toDateString();

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-5">
      <div>
        {/* TODO: Button to take us back */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">
            <PostClient initialPosts={posts} />
          </div>
          {/* info sidebar */}
          <BoxForum
            forum={subreddit}
            isSubscribed={isSubscribed}
            memberCount={memberCount}
            postsCount={postsCount}
            sessionId={session.user.id}
            slug={slug}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
