"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/item/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const { mutate: onCreate, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data } = await axios.post(
        `/api/update/course/${courseId}/attachments`,
        values
      );
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          toast({
            title: "Aksi ditolak!",
            description:
              "Kamu tidak bisa melakukan aksi ini karena bukan pemilik materi !!",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "aksi gagal!",
        description: "Aksi gagal, coba lagi nanti !!",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "Edit data berhasil.",
      });
      toggleEdit();
      router.refresh();
    },
    onMutate: () => {
      toast({
        title: "Mohon tunggu...",
        description: "Edit sedang dilakukan.",
      });
    },
  });
  function onSave(values: z.infer<typeof formSchema>) {
    onCreate(values);
  }

  const { mutate: onDelete } = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      await axios.delete(`/api/update/course/${courseId}/attachments/${id}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          toast({
            title: "Aksi ditolak!",
            description:
              "Kamu tidak bisa melakukan aksi ini karena bukan pemilik materi !!",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "aksi gagal!",
        description: "Aksi gagal, coba lagi nanti !!",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "File berhasil dihapus.",
      });
      toggleEdit();
      router.refresh();
      setDeletingId(null);
    },
    onMutate: () => {
      toast({
        title: "Mohon tunggu...",
        description: "File sedang dihapus.",
      });
    },
  });

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Materi file
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Batal</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">Belum ada file</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.FileName ? (
                      attachment.FileName
                    ) : (
                      <p>File belum mempunyai nama</p>
                    )}
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSave({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4"></div>
        </div>
      )}
    </div>
  );
};
