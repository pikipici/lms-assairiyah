import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Header } from "@/components/item/Header";
import { Shell } from "@/components/item/Shell";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import { getAuthSession } from "@/lib/auth";
import PollClient from "@/components/item/polling/PollClient";

const PollResultsPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/signin");
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
        lte: new Date(), // only show polls that have expired
      },
    },
  });

  return (
    <Shell layout="dashboard" className="px-1">
      <Header
        title="Hasil Polling"
        description="Riwayat polling dan hasil yang diperoleh."
      />
      <PollClient initialPolls={initialPolls} sessionId={session.user.id} />
    </Shell>
  );
};

export default PollResultsPage;
