"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  CreateEventValidator,
  CreateEventValidatorServerType,
  CreateEventValidatorType,
} from "@/lib/validators/event";
import { Card, CardHeader } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import CustomToolTip from "@/components/ui/Custom-UI/CustomToolTip";
import { FileUpload } from "@/components/item/admin/Events/button-upload";

const CreateEventForm = () => {
  const router = useRouter();
  const params = useParams();
  const { loginToast, endErrorToast } = useCustomToast();

  const [file, setFile] = useState<string>("0");
  const [options, setOptions] = useState<string[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [text, setText] = useState("");

  //react-hook-form initialization
  const form = useForm<CreateEventValidatorType>({
    resolver: zodResolver(CreateEventValidator),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate: createEvent, isLoading } = useMutation({
    mutationFn: async (content: CreateEventValidatorType) => {
      const payload: CreateEventValidatorServerType = {
        title: content.title,
        description: content.description,
        url: file,
        startAt: date?.from,
        setExpiresAt: date?.to,
      };

      const { data } = await axios.post("/api/create/events", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "Event Berhasil ditambahkan.",
      });
      router.push(`/admin/events`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description: "Tanggal event tidak boleh kosong!",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Mohon tunggu",
        description: "Data sedang diinput.",
      });
    },
  });

  function onSubmit(content: CreateEventValidatorType) {
    createEvent(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Event</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukan nama event di sini."
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
              <FormLabel>Deskripsi Event</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan Deskripsi Forum."
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      createEvent(form.getValues());
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col space-y-3">
          <div className="flex gap-x-2 items-center">
            <FormLabel>Keterangan Event</FormLabel>
          </div>
          {file === "0" ? (
            <FormControl>
              <FileUpload
                endpoint="eventFile"
                onChange={(url) => {
                  if (url) {
                    setFile(url);
                  }
                }}
              />
            </FormControl>
          ) : (
            <p>keterangan terinput</p>
          )}

          <FormMessage />
        </FormItem>

        <FormItem className="flex flex-col space-y-3">
          <div className="flex gap-x-2 items-center">
            <FormLabel>Tanggal Event</FormLabel>
            <CustomToolTip text="The results will be displayed on this day">
              <Icons.info className="h-3 w-3 text-muted-foreground " />
            </CustomToolTip>
          </div>
          <FormControl>
            <DatePicker value={date} setValue={setDate} />
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
          <span className="sr-only">Buat Event</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateEventForm;
