"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/ui/Custom-UI/Icon";

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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "@/hooks/use-custom-toast";

interface UserNameFormProps {
  initialData: User;
  userId: string;
}

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Masukan nama dengan benar",
  }),
});

export const UserNameForm = ({ initialData, userId }: UserNameFormProps) => {
  const { loginToast, endErrorToast } = useCustomToast();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialData?.username || "",
    },
  });

  const { mutate: save, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data } = await axios.patch(`/api/update/user/${userId}`, values);
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
            description: "User tidak ditemukan !!",
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

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Username
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
      {!isEditing && <p className="text-sm mt-2">{initialData.username}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSave)(...args)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Input username disini"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button className="w-fit" disabled={isLoading} size="sm">
                {isLoading && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Simpan
                <span className="sr-only">Simpan</span>
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
