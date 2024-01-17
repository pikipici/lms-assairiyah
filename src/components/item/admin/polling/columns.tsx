"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PollingColumn = {
  id: string;
  question: string;
  creator: string;
  expiresAt: string;
};

export const columns: ColumnDef<PollingColumn>[] = [
  {
    accessorKey: "creator",
    header: "Pembuat Polling",
  },
  {
    header: "Polling",
    accessorKey: "question",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.question ? <p>{row.original.question}</p> : "-"}
        </div>
      );
    },
  },
  {
    header: "Tanggal Berakhir",
    accessorKey: "expiresAt",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.expiresAt ? <p>{row.original.expiresAt}</p> : "-"}
        </div>
      );
    },
  },

  // {
  //   header: "Aksi",
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <CustomSheetForum id={row.original.id}>
  //       <Trash />
  //     </CustomSheetForum>

  //   ),
  // },
];
