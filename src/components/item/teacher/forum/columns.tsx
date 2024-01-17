"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Subreddit, User } from "@prisma/client";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ForumColumn = {
  id: string;
  name: string;
  creator: string | undefined;
  posts: number;
  subscriber: number;
  createdAt: string;
  Forum: Subreddit;
};

export const columns: ColumnDef<ForumColumn>[] = [
  {
    accessorKey: "name",
    header: "Nama Forum",
  },
  {
    header: "Pembuat Forum",
    accessorKey: "Forum",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.creator ? <p>{row.original.creator}</p> : "-"}
        </div>
      );
    },
  },
  {
    header: "Jumlah Postingan",
    accessorKey: "posts",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.posts !== 0 ? (
            <p>{row.original.posts}</p>
          ) : (
            "Forum belum mempunyai postingan"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "subscriber",
    header: "Jumlah Anggota Forum",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal dibuat",
  },

  {
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
