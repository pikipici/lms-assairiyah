"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Custom-UI/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { PostColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/Custom-UI/data-table";

interface PostClientProps {
  data: PostColumn[];
}

export const PostClient: React.FC<PostClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Jumlah Postingan (${data.length})`}
          description="Kelola Postingan"
        />
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
