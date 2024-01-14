"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/hooks/use-custom-toast";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nama harus lebih dari 1 huruf",
  }),
});

const AddTeachers = () => {
  const { loginToast, endErrorToast } = useCustomToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: onCreate, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data } = await axios.post(`/api/create/user/teacher`, values);
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
            description: "User tidak ditemukan.",
            variant: "destructive",
          });
        }
      }
      endErrorToast();
    },
    onSuccess: () => {
      router.refresh();
      form.reset();
      toast({
        title: "Berhasil!",
        description: "Data guru berhasil ditambahkan ke dalam database.",
      });
    },
    onMutate: () => {
      toast({
        title: "Mohon tunggu...",
        description: "Data guru sedang ditambahkan.",
      });
    },
  });

  function onSave(values: z.infer<typeof formSchema>) {
    onCreate(values);
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-4">
        <Form {...form}>
          <form
            id="add-teacher-form"
            onSubmit={(...args) => void form.handleSubmit(onSave)(...args)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Nama Guru</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nama Guru"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTeachers;
