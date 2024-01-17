"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import Image from "next/image";
import { Badge } from "@chakra-ui/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MateriColumn = {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
  chapter: number;
};

export const MateriColumns: ColumnDef<MateriColumn>[] = [
  {
    header: "Judul Materi",
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.title ? (
            <p>{row.original.title}</p>
          ) : (
            "Judul Materi Kosong"
          )}
        </div>
      );
    },
  },
  {
    header: "Pembahasan",
    accessorKey: "chapter",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.chapter ? (
            <p>{row.original.chapter} Pembahasan</p>
          ) : (
            "Tidak ada pembahasan"
          )}
        </div>
      );
    },
  },
  {
    header: "Dibuat Pada",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.createdAt ? <p>{row.original.createdAt}</p> : "-"}
        </div>
      );
    },
  },
  {
    header: "Keterangan Publish",
    accessorKey: "isPublished",
    cell: ({ row }) => {
      const statusPublish =
        row.original.isPublished === true ? (
          <Badge variant="solid" colorScheme="green">
            Sudah Di Publish
          </Badge>
        ) : (
          <Badge variant="solid" colorScheme="red">
            Belum Di Publish
          </Badge>
        );

      return <div className="font-medium">{statusPublish}</div>;
    },
  },
  {
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
