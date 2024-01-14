"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import { StudentColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";
import CustomSheetStudents from "@/components/ui/Custom-UI/sheet/CustomSheetStudents";

interface StudentClientProps {
  data: StudentColumn[];
}

export const StudentClient: React.FC<StudentClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Jumlah Siswa (${data.length})`}
          description="Kelola Data Siswa"
        />
        <CustomSheetStudents>Tambah</CustomSheetStudents>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
