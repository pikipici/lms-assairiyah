"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { User } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Pencil } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";

interface AddressFormProps {
  initialData: User;
  userId: string;
}

const formSchema = z.object({
  address: z.string().min(1, {
    message: "Alamat harus lebih dari satu huruf !",
  }),
});

export const AddressForm = ({ initialData, userId }: AddressFormProps) => {
  const { loginToast, endErrorToast } = useCustomToast();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: initialData?.address || "",
    },
  });

  const { mutate: onSave, isLoading } = useMutation({
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

  function saveData(values: z.infer<typeof formSchema>) {
    onSave(values);
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Informasi Alamat
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
        <p className="text-sm mt-2">
          {initialData?.address || "Alamat belum diinput"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={(...args) => void form.handleSubmit(saveData)(...args)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Input alamat di sini"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isLoading}>
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
