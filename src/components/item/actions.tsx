"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/Custom-UI/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useToast } from "@chakra-ui/react";
import { Icons } from "../ui/Custom-UI/Icon";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
  teachersId: string;
}

export const Actions = ({
  disabled,
  courseId,
  isPublished,
  teachersId,
}: ActionsProps) => {
  const router = useRouter();
  const toast = useToast();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/update/course/${courseId}/unpublish`);
        toast({
          title: "Berhasil",
          description: "Materi berhasil diunpublish.",
          position: "top",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.patch(`/api/update/course/${courseId}/publish`);

        toast({
          title: "Berhasil",
          description: "Materi berhasil terpublish.",
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        confetti.onOpen();
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

      await axios.delete(`/api/delete/course/${courseId}`);

      toast({
        title: "Berhasil",
        description: "Pembahasan berhasil terhapus.",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.refresh();
      router.push(`/teacher/materi`);
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
        disabled={isLoading}
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
          {isDelete === true ? (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </ConfirmModal>
    </div>
  );
};
