"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "react-hot-toast";
import {
  CreateCommunityValidatorType,
  createCommunityValidator,
} from "@/lib/validators/community";
import { Combobox } from "@/components/ui/Custom-UI/ComboBox";
import { categories } from "@/data/community";
import { Textarea } from "@/components/ui/textarea";

const CreateCommunityClient = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const [category, setCategory] = useState("Umum");

  //react-hook-form initialization
  const form = useForm<CreateCommunityValidatorType>({
    resolver: zodResolver(createCommunityValidator),
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async (content: CreateCommunityValidatorType) => {
      const payload: CreateCommunityValidatorType = {
        name: content.name.toLowerCase(),
        description: content.description,
        category: category,
      };

      const { data } = await axios.post("/api/create/forum", payload);
      return data;
    },
    onSuccess: () => {
      router.back();
      router.refresh();
      form.reset();

      toast.success("Forum berhasil dibuat");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toast.error("Kategori Kosong!");
        }
        if (statusCode === 409) {
          return toast.error("Nama Forum Sudah Ada");
        }
        if (statusCode === 422) {
          return toast.error("422");
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast.loading("Mohon tunggu");
    },
  });

  function onSubmit(content: CreateCommunityValidatorType) {
    createCommunity(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Forum</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan Nama Forum."
                  {...field}
                  disabled={isLoading}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Forum</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan Deskripsi Forum."
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      createCommunity(form.getValues());
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Kategori Forum</FormLabel>
              <FormControl>
                <Combobox
                  data={categories}
                  placeholder="Pilih Kategori..."
                  setState={setCategory}
                  selectedOption={category}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isLoading} size="sm">
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Buat Forum
          <span className="sr-only">Membuat Forum</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateCommunityClient;
