"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { EventColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";

interface PostClientProps {
  data: EventColumn[];
  adminId: string;
}

export const EventClient: React.FC<PostClientProps> = ({ data, adminId }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Daftar Acara Sekolah (${data.length})`}
          description="Kelola Acara"
        />
        <Button onClick={() => router.push(`/admin/events/create`)}>
          Tambah
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
