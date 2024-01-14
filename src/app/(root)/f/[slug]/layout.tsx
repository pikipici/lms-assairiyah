import { cn, formatUrl } from "@/lib/utils";

import NavbarForum from "@/components/item/forum/NavbarForum";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ForumHeader from "@/components/item/forum/ForumHeader";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Forum Sekolah",
};

export default async function SetupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  const { slug: rawSlug } = params;
  const slug = formatUrl(rawSlug, true);

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
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

  const createdForum = subreddit.createdAt.toDateString();

  return (
    <div className={cn("bg-white text-slate-900 antialiased light")}>
      <div className="min-h-screen bg-slate-50 antialiased">
        <NavbarForum />
        <ForumHeader data={subreddit} />

        <div className="container max-w-7xl mx-auto h-full">{children}</div>
      </div>
    </div>
  );
}
