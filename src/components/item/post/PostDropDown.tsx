"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { Poll, Post, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/Custom-UI/Icon";

import { toast } from "@/hooks/use-toast";
import { DeletePollValidatorType } from "@/lib/validators/poll";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast as toaster } from "@/hooks/use-toast";
import { IdPostSchemaType } from "@/lib/validators/post";
import { useSession } from "next-auth/react";

interface PollDropdownProps {
  children: ReactNode;
  post: Post & {
    savedby: User[];
  };
}

const PostDropdown: FC<PollDropdownProps> = ({ children, post }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { mutate: unkeepPost, isLoading: unkeepLoader } = useMutation({
    mutationFn: async (Id: string) => {
      const payload: IdPostSchemaType = { id: Id };

      const { data } = await axios.patch("/api/posts/unsave", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();

      toaster({
        title: "Berhasil!",
        description: "Postingan tidak disimpan.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toaster({
            title: "Save Gagal!",
            description: "Post Tidak Ditemukan !.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toaster({
        title: "Mohon tunggu...",
        description: "Sedang menghapus post dari daftar simpan.",
      });
    },
  });

  const { mutate: keepPost, isLoading: keepLoader } = useMutation({
    mutationFn: async (Id: string) => {
      const payload: IdPostSchemaType = { id: Id };

      const { data } = await axios.patch("/api/posts/save", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();

      toaster({
        title: "Berhasil!",
        description: "Postingan berhasil disimpan.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toaster({
            title: "Save Gagal!",
            description: "Post Tidak Ditemukan !.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toaster({
        title: "Mohon tunggu...",
        description: "Sedang menyimpan postingan.",
      });
    },
  });

  //     mutationFn: async () => {
  //       const payload: DeletePollValidatorType = {
  //         pollId: poll.id,
  //       };

  //       const { data } = await axios.post("/api/poll/delete", payload);

  //       return data;
  //     },
  //     onSuccess: () => {
  //       toast({
  //         title: "Success",
  //         description: "Poll deleted successfully.",
  //       });

  //       queryClient.invalidateQueries(pollInfiniteQueryKey);
  //     },
  //     onError: (error) => {
  //       if (error instanceof AxiosError) {
  //         const statusCode = error.response?.status;
  //         if (statusCode === 401) {
  //           return loginToast();
  //         }
  //         if (statusCode === 404) {
  //           return toast({
  //             title: "Poll does not exist.",
  //             description: "Try again later.",
  //             variant: "destructive",
  //           });
  //         }
  //       }

  //       endErrorToast();
  //     },
  //     onMutate: () => {
  //       toast({
  //         title: "Please wait",
  //         description: "We are deleting your poll.",
  //       });
  //     },
  //   });
  const currentSaves = post.savedby.find(
    (saves) => saves.id === session?.user.id
  );

  const optionSave = currentSaves ? (
    <DropdownMenuItem
      onClick={() => unkeepPost(post.id)}
      className="cursor-pointer"
    >
      <div className="flex items-center gap-x-2">
        <BsFillBookmarkFill className="h-4 w-4" />
        Hapus
      </div>
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem
      onClick={() => keepPost(post.id)}
      className="cursor-pointer"
    >
      <div className="flex items-center gap-x-2">
        <BsBookmark className="h-4 w-4" />
        Simpan
      </div>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex items-center gap-x-2">
            <Icons.share className="h-4 w-4" />
            Share
          </div>
        </DropdownMenuItem>

        {optionSave}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostDropdown;
