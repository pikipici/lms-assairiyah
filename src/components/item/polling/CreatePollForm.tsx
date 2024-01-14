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
import { toast } from "@/hooks/use-toast";
import {
  CreatePollValidator,
  CreatePollValidatorServerType,
  CreatePollValidatorType,
} from "@/lib/validators/poll";
import { Card, CardHeader } from "@/components/ui/card";
import { DatePickerSingle } from "@/components/ui/date-picker-single";
import CustomToolTip from "@/components/ui/Custom-UI/CustomToolTip";

const CreatePollForm = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const [options, setOptions] = useState<string[]>([]);
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(new Date());
  const [text, setText] = useState("");

  //react-hook-form initialization
  const form = useForm<CreatePollValidatorType>({
    resolver: zodResolver(CreatePollValidator),
    defaultValues: {
      question: "",
    },
  });

  const { mutate: createPoll, isLoading } = useMutation({
    mutationFn: async (content: CreatePollValidatorType) => {
      const payload: CreatePollValidatorServerType = {
        question: content.question,
        options,
        expiresAt,
      };

      const { data } = await axios.post("/api/create/poll", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/polling");
      router.refresh();
      form.reset();

      toast({
        title: "Berhasil!",
        description: "Polling kamu berhasil dibuat.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 409) {
          return toast({
            title: "Error!",
            description: "Polling ini sudah ada. mohon ganti pertanyaannya.",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description: "Jarak waktu terlalu jauh.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Mohon tunggu...",
        description: "Polling sedang dibuat.",
      });
    },
  });

  function onSubmit(content: CreatePollValidatorType) {
    if (!expiresAt) {
      return toast({
        title: "Error!",
        description: "You have to set an expiry date.",
        variant: "destructive",
      });
    }

    if (options.length < 2 || options.length > 10) {
      return toast({
        title: "Error!",
        description: "Polling harus memiliki lebih dari 2 pilihan.",
        variant: "destructive",
      });
    }

    createPoll(content);
  }

  const handleAddOption = () => {
    if (text.length === 0 || text.length > 80) {
      return toast({
        title: "Error!",
        description: "Pilihan harus lebih dari 1 karakter.",
        variant: "destructive",
      });
    }

    const findOption = options.find((option) => option === text);

    if (findOption) {
      return toast({
        title: "Error!",
        description: "Pilihan sudah ada.",
        variant: "destructive",
      });
    }

    setOptions([...options, text]);
    setText("");
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pertanyaan Polling</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukan pertanyaan polling disini."
                  {...field}
                  disabled={isLoading}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormItem className="space-y-3">
            <div className="flex gap-x-2 items-center">
              <FormLabel>Opsi Polling</FormLabel>
              <CustomToolTip text="Tekan 'enter' atau pilih tambah opsi untuk menambahkan opsi">
                <Icons.info className="h-3 w-3 text-muted-foreground" />
              </CustomToolTip>
            </div>
            <FormControl>
              <>
                <Input
                  placeholder="Masukan opsi polling di sini."
                  disabled={isLoading}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddOption}
                    type="button"
                  >
                    Tambah opsi
                    <Icons.plus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            </FormControl>
            <FormMessage />
          </FormItem>

          {options.length > 0 && (
            <div className="space-y-2">
              <FormLabel>Opsi Polling</FormLabel>
              {options.map((option, index) => (
                <Card key={index} className="flex items-center">
                  <CardHeader className="py-2 px-3 w-full">
                    <span className="text-sm">{option}</span>
                  </CardHeader>
                  <Icons.delete
                    className="h-3.5 w-3.5 mr-3 hover:text-muted-foreground transition cursor-pointer"
                    onClick={() =>
                      setOptions(options.filter((item) => item !== option))
                    }
                  />
                </Card>
              ))}
            </div>
          )}
        </div>

        <FormItem className="flex flex-col space-y-3">
          <div className="flex gap-x-2 items-center">
            <FormLabel>Tanggal Berakhirnya Polling.</FormLabel>
            <CustomToolTip text="The results will be displayed on this day">
              <Icons.info className="h-3 w-3 text-muted-foreground " />
            </CustomToolTip>
          </div>
          <FormControl>
            <DatePickerSingle value={expiresAt} setValue={setExpiresAt} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button className="w-fit" disabled={isLoading} size="sm">
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Buat
          <span className="sr-only">Buat polling</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreatePollForm;
