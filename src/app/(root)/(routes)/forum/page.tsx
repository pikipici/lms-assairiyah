import Link from "next/link";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/item/Shell";
import { buttonVariants } from "@/components/ui/button";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import CommunityClient from "@/components/item/forum/CommunityClient";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { ExtendedCommunity } from "@/types/db";

const ForumPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/signin");
  }

  const getUser = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const roleMenu =
    getUser?.role === "ADMIN" ? (
      <Link href="/forum/create" className={cn(buttonVariants(), "w-fit")}>
        Buat Forum
      </Link>
    ) : getUser?.role === "TEACHER" ? (
      <Link href="/forum/create" className={cn(buttonVariants(), "w-fit")}>
        Buat Forum
      </Link>
    ) : getUser?.role === "STUDENT" ? null : null;

  const initialCommunities = await db.subreddit.findMany({
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    include: {
      posts: true,
      Creator: true,
    },
  });

  return (
    <Shell layout="dashboard" className="px-1">
      <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Semua Forum
      </h1>
      {roleMenu}
      <CommunityClient initialCommunities={initialCommunities} />
    </Shell>
  );
};

export default ForumPage;
