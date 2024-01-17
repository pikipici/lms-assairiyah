"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course, User } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/item/file-upload";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";

interface ImageTeacherFormProps {
  initialData: User;
  userId: string;
}

const formSchema = z.object({
  image: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageTeacherForm = ({
  initialData,
  userId,
}: ImageTeacherFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: initialData?.image || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/update/user/${userId}`, values);
      toast({
        title: "Berhasil!",
        description: "Data berhasil ditambahkan ke dalam database.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      return toast({
        title: "Aksi Gagal",
        description: "Coba lagi nanti",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Gambar profile
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Batal</>}

          {!isEditing && !initialData.image && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah gambar
            </>
          )}

          {!isEditing && initialData.image && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit gambar
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.image ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.image}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="profileImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ image: url });
              }
            }}
          />

          <div className="text-xs text-muted-foreground mt-4">
            Upload gambar profile guru
          </div>
        </div>
      )}
    </div>
  );
};
