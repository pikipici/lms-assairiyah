"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import { Button as ButtonChakra, useDisclosure } from "@chakra-ui/react";

import { Button } from "@/components/ui/button";
import { PostColumn } from "./columns";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { IdUserSchemaType } from "@/lib/validators/user";
import { toast as toaster } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "@/hooks/use-custom-toast";

interface CellActionProps {
  data: PostColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const { loginToast, endErrorToast } = useCustomToast();

  const { mutate: deleteUser, isLoading: deleteLoader } = useMutation({
    mutationFn: async (Id: string) => {
      const payload: IdUserSchemaType = { id: Id };

      const { data } = await axios.post("/api/delete/post", payload);
      return data;
    },
    onSuccess: () => {
      onClose();
      router.refresh();

      toaster({
        title: "Sukses!",
        description: "Data postingan berhasil dihapus",
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
            description: "Kamu bukan admin !.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toaster({
        title: "Loading...",
        description: "Sedang menghapus data postingan",
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Url
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
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
          <AlertDialogHeader>Hapus Data Ini ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Apakah kamu yakin ingin menghapus data ini? Jika sudah dihapus tidak
            dapat dikembalikan lagi.
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonChakra ref={cancelRef} onClick={onClose}>
              Tidak
            </ButtonChakra>
            <ButtonChakra
              isLoading={deleteLoader}
              colorScheme="red"
              ml={3}
              onClick={() => deleteUser(data.id)}
            >
              Lanjutkan
            </ButtonChakra>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
