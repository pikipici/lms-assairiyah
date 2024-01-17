"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/Custom-UI/confirm-modal";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { useToast } from "@chakra-ui/react";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  teachersId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  teachersId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const toast = useToast();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/update/course/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast({
          title: "Berhasil",
          description: "Pembahasan berhasil diunpublish.",
          position: "top",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.patch(
          `/api/update/course/${courseId}/chapters/${chapterId}/publish`
        );
        toast({
          title: "Berhasil",
          description: "Pembahasan berhasil terpublish.",
          position: "top",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      router.refresh();
    } catch {
      toast({
        title: "Gagal ",
        description: "Aksi gagal, coba lagi nanti.",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsDelete(true);

      await axios.delete(
        `/api/delete/course/${courseId}/chapters/${chapterId}`
      );

      toast({
        title: "Berhasil",
        description: "Pembahasan berhasil terhapus.",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.refresh();
      router.push(`/teacher/materi/${courseId}`);
    } catch {
      toast({
        title: "Gagal ",
        description: "Aksi gagal, coba lagi nanti.",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        className="w-fit"
        disabled={isLoading || disabled}
        size="sm"
        variant="outline"
        onClick={onClick}
      >
        {isLoading && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {isPublished ? "Unpublish" : "Publish"}
        <span className="sr-only">{isPublished ? "Unpublish" : "Publish"}</span>
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
