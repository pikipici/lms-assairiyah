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
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/Combobox";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface MapelFormProps {
  initialData: Course;
  courseId: string;
  mapelName: string | null;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  mapelId: z.string().min(1),
});

export const MapelForm = ({
  initialData,
  courseId,
  mapelName,
  options,
}: MapelFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mapelId: initialData?.mapelId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const { mutate: onCreate, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data } = await axios.patch(
        `/api/update/course/${courseId}`,
        values
      );
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          toast({
            title: "kamu belum login!",
            description:
              "Kamu tidak bisa melakukan aksi ini karena belum login !!",
            variant: "destructive",
          });
          return redirect("/signin");
        }
        if (statusCode === 403) {
          return toast({
            title: "Aksi ditolak!",
            description:
              "Kamu tidak bisa melakukan aksi ini karena bukan guru !!",
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
      toggleEdit();
      router.refresh();
      form.reset();

      toast({
        title: "Berhasil!",
        description: "Edit data berhasil.",
      });
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

  const selectedOption = options.find(
    (option) => option.value === initialData.mapelId
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Mata Pelajaran
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
            !initialData.mapelId && "text-slate-500 italic"
          )}
        >
          {mapelName || "Belum Ditambahkan"}
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
              name="mapelId"
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
