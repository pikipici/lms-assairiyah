import { DropTargetMonitor, useDrop } from "react-dnd";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DragCourseType } from "@/types/item-type";
import { DragItem } from "./DragItem";
import useNotStarted from "./useNotStartedModal";
import useCurrentlyLearning from "./useCurrentlyLearning";
import useFinishedLearning from "./useFinishedLearning";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { CourseProgressUpdateType } from "@/lib/validators/course";
import { toast } from "@/hooks/use-toast";
import CustomContextMenu from "@/components/ui/Custom-UI/CustomContextMenu";

const CurrentlyLearningContainer = () => {
  const { loginToast, endErrorToast } = useCustomToast();

  const { board, addImageToBoard, removeItemFromBoard } =
    useCurrentlyLearning();

  const { removeItemFromBoard: removeNotStarted } = useNotStarted();

  const { removeItemFromBoard: removeFinishedLearning } = useFinishedLearning();

  const { mutate: changeCourseStatusForUser } = useMutation({
    mutationFn: async ({ item }) => {
      const payload: CourseProgressUpdateType = {
        courseId: item.courseId,
        category: item.category,
        dropTo: "watching",
      };

      const { data } = await axios.patch("/api/course/progress", payload);

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Mohon refresh halaman ini.",
            description: "Materi pembelajaran tidak ditemukan didalam daftar.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: ({
      item,
      monitor,
    }: {
      item: DragCourseType;
      monitor: DropTargetMonitor;
    }) => {
      onDrop(item, monitor);
    },
  });

  const onDrop = (item: DragCourseType, monitor: DropTargetMonitor) => {
    const dropAreaType = monitor.getItemType();

    if (dropAreaType !== "currentDropArea") {
      removeItemFromBoard(item.id);
    }

    const sourceBoard = item.category;

    if (sourceBoard === "pending") {
      removeNotStarted(item.id);
    } else if (sourceBoard === "finished") {
      removeFinishedLearning(item.id);
    }

    addImageToBoard(item);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: DragCourseType, monitor: DropTargetMonitor) =>
      changeCourseStatusForUser({ item, monitor }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Card
      className={cn("flex flex-col gap-y-2 items-center min-h-[200px]", {
        "border-blue-600": isOver,
      })}
      ref={drop}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-center">Sedang dipelajari</CardTitle>
      </CardHeader>
      <div className="flex flex-col w-full pb-2">
        {board.length === 0 && (
          <p className="text-center text-muted-foreground text-sm">
            Tidak ada materi
          </p>
        )}
        {board.map((item) => {
          const structuredItem: DragCourseType = {
            id: item.id,
            name: item.name,
            courseId: item.courseId,
            category: "watching",
          };
          return (
            <CustomContextMenu key={item.id} data={item}>
              <CardContent className="w-full py-2">
                <DragItem item={structuredItem} />
              </CardContent>
            </CustomContextMenu>
          );
        })}
      </div>
    </Card>
  );
};

export default CurrentlyLearningContainer;
