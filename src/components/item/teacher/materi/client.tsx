"use client";

import React from "react";

import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import { MateriColumn, MateriColumns } from "./columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";
import CustomCreateCourse from "@/components/ui/Custom-UI/CustomCreateCourse";

interface PostClientProps {
  data: MateriColumn[];
}

export const MateriClient: React.FC<PostClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Materi Pembelajaran Anda (${data.length})`}
          description="Kelola Materi"
        />
        <CustomCreateCourse>Tambah</CustomCreateCourse>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={MateriColumns} data={data} />
    </>
  );
};
