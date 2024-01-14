import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/item/Shell";
import { Header } from "@/components/item/Header";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import PollClient from "@/components/item/polling/PollClient";

const PollPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const initialPolls = await db.poll.findMany({
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
    },
  });

  return (
    <Shell layout="dashboard" className="px-1">
      <Header
        title="Laman Polling"
        description="Laman Polling Mts Assyairiyah Attahiriyah"
      />
      <Link
        href="/polling/create"
        className={cn(buttonVariants({ size: "sm" }), "w-fit")}
      >
        Buat Polling
      </Link>
      <PollClient
        initialPolls={initialPolls}
        interaction
        sessionId={session.user.id}
      />
    </Shell>
  );
};

export default PollPage;
