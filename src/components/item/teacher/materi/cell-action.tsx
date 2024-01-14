"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button as ButtonChakra } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Course } from "@prisma/client";
import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { IdUserSchemaType } from "@/lib/validators/user";
import { toast as toaster } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { MateriColumn } from "./columns";
import { useToast } from "@chakra-ui/react";

interface CellActionProps {
  data: MateriColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const movePage = useToast();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { loginToast, endErrorToast } = useCustomToast();

  function EditButton() {
    setIsEdit(true);
    movePage({
      title: "mohon tunggu...",
      description: "Data sedang diambil.",
      position: "top",
      status: "loading",
      duration: 5000,
      isClosable: true,
    });
    router.push(`/teacher/materi/${data.id}`);
  }

  const { mutate: deleteMateri, isLoading: deleteLoader } = useMutation({
    mutationFn: async (Id: string) => {
      const payload: IdUserSchemaType = { id: Id };

      const { data } = await axios.post("/api/teacher/courses/delete", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
      onClose;
      toaster({
        title: "Sukses!",
        description: "Materi pembelajaran berhasil dihapus",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toaster({
            title: "Forbidden!",
            description: "Kamu bukan guru !.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toaster({
        title: "Mohon tunggu...",
        description: "Sedang menghapus data.",
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => EditButton()}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpen}>
            <Trash className="mr-2 h-4 w-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Hapus Materi Pembelajaran?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Apakah kamu yakin ingin menghapus materi ini? Jika sudah dihapus
            tidak dapat dikembalikan lagi.
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonChakra ref={cancelRef} onClick={onClose}>
              Tidak
            </ButtonChakra>
            <ButtonChakra
              isLoading={deleteLoader}
              colorScheme="red"
              ml={3}
              onClick={() => deleteMateri(data.id)}
            >
              Iya
            </ButtonChakra>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
