"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatMapel } from "@/lib/utils";
import { CellAction } from "./cell-action";
import { User } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MapelColumn = {
  id: string;
  name: string;
  courses: number;
};

export const MapelColumns: ColumnDef<MapelColumn>[] = [
  {
    header: "Mata Pelajaran",
    accessorKey: "name",
    cell: ({ row }) => {
      const { name } = row.original;
      const formatted = formatMapel(name, true);
      return (
        <div className="font-medium">
          {row.original.name ? <p>{formatted}</p> : "Belum ada mata pelajaran"}
        </div>
      );
    },
  },
  {
    header: "Jumlah Materi Pembelajaran",
    accessorKey: "courses",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.courses !== 0 ? (
            <p>{row.original.courses}</p>
          ) : (
            "Belum mempunyai materi pembelajaran"
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "courses",
  //   header: "Jumlah Materi Pembelajaran",
  // },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
