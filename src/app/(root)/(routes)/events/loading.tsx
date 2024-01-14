import { Shell } from "@/components/item/Shell";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableSkeleton from "@/components/item/Skeleton/TableSkeleton";

const TableColumns = [
  "Deskripsi event",
  "Nama Kegiatan",
  "Tanggal Dimulai",
  "Selesai Pada",
  "Keterangan",
];

const StatisticsLoading = () => {
  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Acara Sekolah
      </h1>
      <ScrollArea className="w-full" orientation="horizontal">
        <TableSkeleton columns={TableColumns} />
      </ScrollArea>
    </Shell>
  );
};

export default StatisticsLoading;
