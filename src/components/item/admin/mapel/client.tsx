"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { MapelColumn, MapelColumns } from "./columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";

import CustomSheetMapel from "@/components/ui/Custom-UI/sheet/CustomSheetMapel";

interface PostClientProps {
  data: MapelColumn[];
  adminId: string;
}

export const MapelClient: React.FC<PostClientProps> = ({ data, adminId }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Jumlah Mata Pelajaran(${data.length})`}
          description="Kelola Mata Pelajaran"
        />
        <CustomSheetMapel>Tambah</CustomSheetMapel>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={MapelColumns} data={data} />
    </>
  );
};
