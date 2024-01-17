"use client";

import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// import { Button, ButtonGroup } from '@chakra-ui/react'
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  userId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

export const CourseProgressButton = ({
  userId,
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/update/course/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/materi/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    // <Button leftIcon={<MdBuild />} colorScheme='whatsapp' variant='solid'>
    //   Settings
    // </Button>

    <Button
      onClick={onClick}
      disabled={isLoading || isCompleted}
      type="button"
      // variant={isCompleted ? "default" : "secondary"}
      variant={isCompleted ? "default" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Sudah selesai" : "Tandai sudah selesai"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
