"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button as ButtonChakra, useDisclosure } from "@chakra-ui/react";
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
import { StudentColumn } from "./columns";
import { Edit, MoreHorizontal, Trash, UserCog } from "lucide-react";
import { useRef, useState } from "react";
import { IdUserSchemaType } from "@/lib/validators/user";
import { toast as toaster } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

interface CellActionProps {
  data: StudentColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const { loginToast, endErrorToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const { mutate: deleteUser, isLoading: deleteLoader } = useMutation({
    mutationFn: async (Id: string) => {
      const payload: IdUserSchemaType = { id: Id };

      const { data } = await axios.post("/api/teacher/delete", payload);
      return data;
    },
    onSuccess: () => {
      onClose();
      router.refresh();

      toaster({
        title: "Sukses!",
        description: "Data murid berhasil dihapus",
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
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/studentlist/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Data Murid
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
              Iya
            </ButtonChakra>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
