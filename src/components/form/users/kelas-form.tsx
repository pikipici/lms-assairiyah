"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course, User } from "@prisma/client";
import { Combobox } from "@/components/ui/Combobox";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

interface KelasFormProps {
  initialData: User;
  userId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  kelasId: z.string().min(1),
});

export const KelasForm = ({ initialData, userId, options }: KelasFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { loginToast, endErrorToast } = useCustomToast();

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kelasId: initialData?.kelasId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const { mutate: save, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data } = await axios.patch(
        `/api/update/teacher/${userId}`,
        values
      );
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toast({
            title: "Aksi ditolak!",
            description:
              "Kamu tidak bisa melakukan aksi ini karena bukan admin !!",
            variant: "destructive",
          });
        }
        if (statusCode === 404) {
          return toast({
            title: "Aksi ditolak!",
            description: "Id Admin tidak ditemukan.",
            variant: "destructive",
          });
        }
        if (statusCode === 405) {
          return toast({
            title: "Aksi gagal",
            description: "Id user tidak ditemukan.",
            variant: "destructive",
          });
        }
      }
      endErrorToast();
    },
    onSuccess: () => {
      toggleEdit();
      router.refresh();
      toast({
        title: "Berhasil!",
        description: "Data berhasil ditambahkan ke dalam database.",
      });
    },
    onMutate: () => {
      toast({
        title: "Mohon tunggu...",
        description: "Data sedang ditambahkan.",
      });
    },
  });

  function onSave(values: z.infer<typeof formSchema>) {
    save(values);
  }

  const selectedOption = options.find(
    (option) => option.value === initialData.kelasId
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Kelas
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Batal</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.kelasId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "Belum Ditambahkan"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSave)(...args)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              disabled={isLoading}
              name="kelasId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
