// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormMessage,
// } from "@/components/ui/form";

// import { Button as ButtonChakra, useDisclosure } from "@chakra-ui/react";
// import {
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
//   AlertDialogCloseButton,
// } from "@chakra-ui/react";

// import { Button } from "@/components/ui/button";
// import { Edit, MoreHorizontal, Trash } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios";
// import { useRef, useState } from "react";
// import { IdUserSchemaType } from "@/lib/validators/user";
// import { toast as toaster } from "@/hooks/use-toast";
// import { useMutation } from "@tanstack/react-query";
// import { useCustomToast } from "@/hooks/use-custom-toast";
// import { Attachment } from "@prisma/client";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// interface CellActionProps {
//   data: Attachment;
// }

// const formSchema = z.object({
//     FileName: z.string().min(1),
//   });

// export const AttachmentAction: React.FC<CellActionProps> = ({ data }) => {
//   const router = useRouter();
//   const params = useParams();

//   const { loginToast, endErrorToast } = useCustomToast();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const cancelRef = useRef(null);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: data.FileName,
//   });

//   const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

//   const { mutate: deleteUser, isLoading: deleteLoader } = useMutation({
//     mutationFn: async (Id: string) => {
//       const payload: IdUserSchemaType = { id: Id };

//       const { data } = await axios.post("/api/teacher/delete", payload);
//       return data;
//     },
//     onSuccess: () => {
//       onClose();
//       router.refresh();

//       toaster({
//         title: "Sukses!",
//         description: "Data guru berhasil dihapus",
//       });
//     },
//     onError: (error) => {
//       if (error instanceof AxiosError) {
//         const statusCode = error.response?.status;
//         if (statusCode === 401) {
//           return loginToast();
//         }
//         if (statusCode === 403) {
//           return toaster({
//             title: "Forbidden!",
//             description: "Kamu bukan admin !.",
//             variant: "destructive",
//           });
//         }
//       }

//       endErrorToast();
//     },
//   });

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Aksi</DropdownMenuLabel>
//           <DropdownMenuItem
//             onClick={() =>
//               router.push(`/admin/${params.adminId}/teacherlist/${data.id}`)
//             }
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Edit Nama File
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={onOpen}>
//             <Trash className="mr-2 h-4 w-4" />
//             Hapus
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <AlertDialog
//         motionPreset="slideInBottom"
//         leastDestructiveRef={cancelRef}
//         onClose={onClose}
//         isOpen={isOpen}
//         isCentered
//       >
//         <AlertDialogOverlay />

//         <AlertDialogContent>
//           <AlertDialogHeader>Hapus Data Ini ?</AlertDialogHeader>
//           <AlertDialogCloseButton />
//           <AlertDialogBody>
//           <Form {...form}>
//           <form
//            id="change-name-file"
//             onSubmit={(...args) => void form.handleSubmit(onSave)(...args)}
//             className="space-y-4 mt-4"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="e.g. 'Advanced web development'"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </form>
//         </Form>
//           </AlertDialogBody>
//           <AlertDialogFooter>
//             <ButtonChakra ref={cancelRef} onClick={onClose}>
//               Tidak
//             </ButtonChakra>
//             <ButtonChakra
//             form="change-name-file"
//               isLoading={deleteLoader}
//               colorScheme="red"
//               ml={3}
//             >
//               Iya
//             </ButtonChakra>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };
