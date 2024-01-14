import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { HeaderMenu } from "@/components/item/HeaderMenu";
import { ShellMenu } from "@/components/item/ShellMenu";
import { EventColumn } from "@/components/item/admin/Events/Columns";
import { db } from "@/lib/db";
import { Suspense } from "react";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";
import { EventClient } from "@/components/item/admin/Events/Client";

moment.locale("id");

export const metadata = {
  title: "Acara Sekolah",
};

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  const adminId = session.user.id;

  const existingEvents = await db.events.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const nowDate = new Date();

  const formattedEvents: EventColumn[] = existingEvents.map((event) => ({
    id: event.id,
    description: event.description!,
    createdAt: moment(event.createdAt).format("LL"),
    title: event.title,
    start: moment(event.start).format("LL"),
    end: moment(event.end).format("LL"),
    // status: event.end > nowDate ? "upcoming" : "ongoing",
    status:
      event.end > nowDate && event.start <= nowDate
        ? "still"
        : event.start > nowDate
        ? "soon"
        : event.end < nowDate
        ? "ended"
        : "done",
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <EventClient data={formattedEvents} adminId={adminId} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
}
