"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import CustomSheetKelas from "@/components/ui/Custom-UI/sheet/CustomSheetKelas";
import { useParams, useRouter } from "next/navigation";
import { KelasColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";

interface PostClientProps {
  data: KelasColumn[];
}

export const KelasClient: React.FC<PostClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Jumlah Kelas(${data.length})`}
          description="Kelola Kelas"
        />
        <CustomSheetKelas>Tambah</CustomSheetKelas>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
