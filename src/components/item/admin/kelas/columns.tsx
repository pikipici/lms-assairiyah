"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { User } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type KelasColumn = {
  id: string;
  name: string;
  courses: number;
  user: number;
};

export const columns: ColumnDef<KelasColumn>[] = [
  {
    accessorKey: "name",
    header: "Kelas",
  },
  {
    header: "Jumlah Siswa",
    accessorKey: "user",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.user !== 0 ? (
            <p>{row.original.user}</p>
          ) : (
            "Belum ada murid yang terdaftar"
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "courses",
  //   header: "Jumlah Siswa",
  // },
  // {
  //   accessorKey: "courses",
  //   header: "Wali Kelas",
  // },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
