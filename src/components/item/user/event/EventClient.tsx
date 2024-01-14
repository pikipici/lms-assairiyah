"use client";
import { Events } from "@prisma/client";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableSkeleton from "../../Skeleton/TableSkeleton";

const TableColumns = [
  "Deskripsi event",
  "Nama Kegiatan",
  "Tanggal Dimulai",
  "Selesai Pada",
  "Keterangan",
];

const EventTable = dynamic(
  () => import("@/components/item/user/event/EventTable"),
  {
    ssr: false,
    loading: () => <LeaderboardSkeleton />,
  }
);

const EventClient = ({ initialData }: { initialData: Events[] }) => {
  return <EventTable initiaDataEvent={initialData} />;
};

export default EventClient;

const LeaderboardSkeleton = () => {
  return (
    <ScrollArea className="w-full" orientation="horizontal">
      <TableSkeleton columns={TableColumns} />
    </ScrollArea>
  );
};
