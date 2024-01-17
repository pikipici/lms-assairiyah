"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { courselists } from "@/data/progress";
import { toast } from "@/hooks/use-toast";
import {
  CourseProgressSchemaType,
  CourseProgressSchema,
  CourseProgressClientType,
} from "@/lib/validators/course";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomToast } from "@/hooks/use-custom-toast";
import CustomCommand from "@/components/ui/Custom-UI/CustomCommand";
import { AddProgressCourseType } from "@/types/item-type";
import { Card, CardHeader } from "@/components/ui/card";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { capitalizeFirstCharacter } from "@/lib/utils";
import { Custombox } from "../ui/Custom-UI/CustomBox";

const AddCourseListForm = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const [category, setCategory] = useState("pending");
  const [courseData, setCourseData] = useState<AddProgressCourseType[]>([]);

  //react-hook-form initialization
  const form = useForm<CourseProgressSchemaType>({
    resolver: zodResolver(CourseProgressSchema),
    defaultValues: {
      category: "",
    },
  });

  const { mutate: addCourse } = useMutation({
    mutationFn: async () => {
      const payload: CourseProgressClientType[] = courseData.map((data) => ({
        courseId: data.id,
        category,
      }));

      const { data } = await axios.post(
        "/api/create/courses/progress",
        payload
      );
      return data;
    },
    onSuccess: () => {
      router.refresh();
      form.reset();
      setCourseData([]);

      toast({
        title: "Berhasil!",
        description:
          "Materi Pembelajaran berhasil di tambahkan ke dalam daftar.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Materi pembelajaran tidak ditemukan",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "Tidak ada yang ditambahkan",
            description: "Tolong pastikan kamu memilih materi pembelajaran.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          toast({
            title: "Materi pembelajaran sudah ada dalam daftar.",
            description:
              "Mengingatkan bahwa materi pembelajaran sudah ada dalam daftar.",
          });
          router.refresh();
          form.reset();
          setCourseData([]);
          return;
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Mohon tunggu..",
        description: "Sedang menambahkan materi pelajaran.",
      });
    },
  });

  function onSubmit() {
    addCourse();
  }

  const handleRemoveSelectedCourse = (courseId: string) => {
    const filteredCourse = courseData.filter(
      (course) => course.id !== courseId
    );

    setCourseData(filteredCourse);
  };

  return (
    <Form {...form}>
      <form
        id="course-progress-form"
        className="grid w-full max-w-xl gap-5 py-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Search</FormLabel>
          <CustomCommand
            setCourseData={setCourseData}
            courseData={courseData}
          />
        </FormItem>
        {courseData.length > 0 && (
          <FormField
            control={form.control}
            name="courseId"
            render={() => (
              <FormItem>
                <FormLabel>Pilih materi</FormLabel>
                <FormControl>
                  <>
                    {courseData.map((selectedCourse) => (
                      <Card
                        key={selectedCourse.id}
                        className="flex items-center"
                      >
                        <CardHeader className="py-2 px-3 w-full">
                          <span className="text-sm">{selectedCourse.name}</span>
                        </CardHeader>
                        <Icons.delete
                          className="h-3.5 w-3.5 mr-3 cursor-pointer hover:text-muted-foreground transition"
                          onClick={() =>
                            handleRemoveSelectedCourse(selectedCourse.id)
                          }
                        />
                      </Card>
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="category"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Custombox
                  data={courselists}
                  selectedOption={capitalizeFirstCharacter(category)}
                  placeholder="Select category..."
                  setState={setCategory}
                />
                {/* <Combobox
                  data={courselists}
                  selectedOption={capitalizeFirstCharacter(category)}
                  placeholder="Select category..."
                  setState={setCategory}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddCourseListForm;
