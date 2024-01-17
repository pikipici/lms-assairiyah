"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { User } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PostColumn = {
  id: string;
  title: string;
  authorId: string;
  createdAt: string;
  author: string | null;
  forum: string | null;
};

export const columns: ColumnDef<PostColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Tanggal di post",
  },
  {
    accessorKey: "title",
    header: "Judul Post",
  },
  {
    accessorKey: "author",
    header: "Pembuat",
  },
  {
    accessorKey: "forum",
    header: "Forum",
  },

  {
    id: "actions",
    header: "Opsi",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
