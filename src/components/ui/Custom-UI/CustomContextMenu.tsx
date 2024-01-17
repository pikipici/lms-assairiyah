import { FC, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Icons } from "@/components/ui/Custom-UI/Icon";
import { DragCourseType } from "@/types/item-type";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { CourseProgressDeleteType } from "@/lib/validators/course";
import useNotStarted from "@/components/item/progress/useNotStartedModal";
import useCurrentlyLearning from "@/components/item/progress/useCurrentlyLearning";
import useFinishedLearning from "@/components/item/progress/useFinishedLearning";

interface CustomContextMenuProps {
  children: ReactNode;
  data: DragCourseType;
}

const CustomContextMenu: FC<CustomContextMenuProps> = ({
  children,
  data: progressData,
}) => {
  const { loginToast, endErrorToast } = useCustomToast();

  const {
    addImageToBoard: addNotStarted,
    removeItemFromBoard: removeNotStarted,
  } = useNotStarted();
  const {
    addImageToBoard: addCurrentlyLearning,
    removeItemFromBoard: removeCurrentlyLearning,
  } = useCurrentlyLearning();
  const {
    addImageToBoard: addFinishedLearning,
    removeItemFromBoard: removeFinishedLearning,
  } = useFinishedLearning();

  const { mutate: deleteCourseFromProgress } = useMutation({
    mutationFn: async () => {
      const payload: CourseProgressDeleteType = {
        progressId: progressData.id,
        category: progressData.category,
      };

      const { data } = await axios.post("/api/anime/watchlist/delete", payload);

      return data;
    },
    onError: (error) => {
      // revert back to the previous state
      if (progressData.category === "pending") {
        addNotStarted(progressData);
      } else if (progressData.category === "watching") {
        addCurrentlyLearning(progressData);
      } else if (progressData.category === "finished") {
        addFinishedLearning(progressData);
      }

      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Anime not found in the watchlist.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Anime deleted from your watchlist.",
      });
    },
    onMutate: () => {
      if (progressData.category === "pending") {
        removeNotStarted(progressData.id);
      } else if (progressData.category === "watching") {
        removeCurrentlyLearning(progressData.id);
      } else if (progressData.category === "finished") {
        removeFinishedLearning(progressData.id);
      }
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => deleteCourseFromProgress()}
          className="cursor-pointer"
        >
          <Icons.delete className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default CustomContextMenu;
