"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ForumColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";
import { useToast } from "@chakra-ui/react";

interface PostClientProps {
  data: ForumColumn[];
  adminId: string;
}

export const ForumClient: React.FC<PostClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const movePage = useToast();

  function EditButton() {
    setIsEdit(true);
    movePage({
      title: "mohon tunggu...",
      description: "Berpindah ke halaman buat forum.",
      position: "top",
      status: "loading",
      duration: 5000,
      isClosable: true,
    });
    router.push(`/admin/forum/create`);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Daftar Semua Forum (${data.length})`}
          description="Kelola Forum"
        />
        <Button onClick={() => EditButton()}>Tambah</Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
