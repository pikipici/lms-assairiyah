"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentColumn = {
  id: string;
  name: string | null;
  email: string | null;
  username: string | null;
  image: string | null;
  role: string | null;
  kelas: any;
};

export const columns: ColumnDef<StudentColumn>[] = [
  {
    header: "Foto Siswa",
    accessorKey: "image",
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
              "Foto Siswa Belum diinput"
            )}
          </div>
        </div>
      );
    },
  },
  {
    header: "Nama Siswa",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.name ? (
            <p>{row.original.name}</p>
          ) : (
            "nama belum diinput"
          )}
        </div>
      );
    },
  },
  {
    header: "Email Siswa",
    accessorKey: "email",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.email ? (
            <p>{row.original.email}</p>
          ) : (
            "email belum diinput"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.kelas ? (
            <p>{row.original.kelas}</p>
          ) : (
            "kelas belum diinput"
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
