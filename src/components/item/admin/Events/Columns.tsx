"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./Cell-action";
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
export type EventColumn = {
  id: string;
  description: string;
  createdAt: string;
  title: string;
  start: string;
  end: string;
  status: string;
};

export const columns: ColumnDef<EventColumn>[] = [
  {
    header: "Deskripsi event",
    accessorKey: "description",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.description ? (
            <p className="line-clamp-1">{row.original.description}</p>
          ) : (
            "Deskripsi Kosong"
          )}
        </div>
      );
    },
  },
  {
    header: "Nama Kegiatan",
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.title ? <p>{row.original.title}</p> : "-"}
        </div>
      );
    },
  },
  {
    header: "Tanggal Dimulai",
    accessorKey: "start",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.start ? <p>{row.original.start}</p> : "-"}
        </div>
      );
    },
  },
  {
    header: "Selesai Pada",
    accessorKey: "end",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.end ? <p>{row.original.end}</p> : "-"}
        </div>
      );
    },
  },
  {
    header: "Keterangan",
    accessorKey: "status",
    cell: ({ row }) => {
      const statusEvent =
        row.original.status === "still" ? (
          <Badge variant="solid">Sedang berlangsung</Badge>
        ) : row.original.status === "soon" ? (
          <Badge variant="solid" colorScheme="red">
            Belum dimulai
          </Badge>
        ) : row.original.status === "ended" ? (
          <Badge variant="solid" colorScheme="green">
            Selesai
          </Badge>
        ) : (
          <p></p>
        );

      return (
        <div className="font-medium">
          {row.original.status ? <p>{statusEvent}</p> : "-"}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
