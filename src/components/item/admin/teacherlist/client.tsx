"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { TeacherColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";
import CustomSheetTeachers from "@/components/ui/Custom-UI/sheet/CustomSheetTeachers";

interface TeacherClientProps {
  data: TeacherColumn[];
  adminId: string;
}

export const TeacherClient: React.FC<TeacherClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Jumlah Guru (${data.length})`}
          description="Kelola Data Guru"
        />
        <CustomSheetTeachers>Tambah</CustomSheetTeachers>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
