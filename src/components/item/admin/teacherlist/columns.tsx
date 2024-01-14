"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye } from "lucide-react";

import { CellAction } from "./cell-action";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TeacherColumn = {
  id: string;
  nip: string | null;
  nuptk: string | null;
  name: string | null;
  email: string | null;
  username: string | null;
  image: string | null;
  role: string | null;
  password: string | null;
};

export const columns: ColumnDef<TeacherColumn>[] = [
  {
    accessorKey: "nip",
    header: "No NIP",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.nip ? <p>{row.original.nip}</p> : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "nuptk",
    header: "No NUPTK",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.nuptk ? <p>{row.original.nuptk}</p> : "-"}
        </div>
      );
    },
  },

  {
    accessorKey: "image",
    header: "Foto profile",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <div className="relative grid aspect-square h-12 w-12 place-items-center overflow-hidden rounded-md">
            {row.original.image ? (
              <Image
                src={row.original.image}
                alt="profile"
                fill
                style={{ objectFit: "contain" }}
              />
            ) : (
              "-"
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama guru",
  },
  {
    accessorKey: "email",
    header: "Email guru",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.email ? (
            <p>{row.original.email}</p>
          ) : (
            "Email belum diinput"
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.password ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Eye />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{row.original.password}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            "Password kosong"
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
