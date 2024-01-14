import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/item/Shell";
import { INFINITE_SCROLLING_PAGINATION_EVENTS } from "@/config";
import EventClient from "@/components/item/user/event/EventClient";

export const metadata: Metadata = {
  title: "Leaderboard",
};

const EventPage = async () => {
  const initialData = await db.events.findMany({
    take: INFINITE_SCROLLING_PAGINATION_EVENTS,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Shell className="w-full">
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Kegiatan Sekolah
      </h1>
      <EventClient initialData={initialData} />
    </Shell>
  );
};

export default EventPage;
