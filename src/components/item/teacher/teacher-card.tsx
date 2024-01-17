"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { buttonVariants } from "@/components/ui/button";
import { useDisclosure } from "@chakra-ui/react";
import { InfoCard } from "./info-card";
// import { Projects } from "contentlayer/generated";

export type TeachersCardProps = {
  id: string;
  name: string;
  image: string;
};

// export const TeachersCard = ({ data }: { data: Projects }) => {
export const TeachersCard = ({ id, name, image }: TeachersCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div onClick={onOpen}>
        <article className="rounded-md overflow-hidden group hover:shadow-2xl transition-shadow duration-500 border hover:shadow-secondary">
          <figure className="relative aspect-video overflow-hidden">
            <Image
              src={image}
              alt={name}
              blurDataURL={image}
              placeholder="blur"
              quality={10}
              fill
              sizes="100%"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="w-full h-full absolute z-30 flex items-center rounded-t justify-center bg-background/80 backdrop-blur-sm overflow-hidden group-hover:opacity-0 transition-opacity duration-500 mx-auto">
              <p className="text-2xl italic font-semibold uppercase">{name}</p>
            </div>
          </figure>
          {/* <div className="p-3">
              <p className="line-clamp-5 text-off-white text-left text-sm text-muted-foreground">
                {data.summary}
              </p>
            </div> */}
        </article>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <InfoCard />
        </ModalContent>
      </Modal>
    </>

    //   <DialogContent className="shadow-2xl shadow-secondary max-w-2xl">
    //     <DialogHeader>
    //       <DialogDescription>
    //         <figure className="relative aspect-video overflow-hidden rounded-md mb-5">
    //           <Image
    //             src={image}
    //             alt={name}
    //             fill
    //             className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
    //           />
    //         </figure>
    //         <ul className="flex items-center gap-x-2 border-y py-2">
    //           <li className="text-foreground">Nama Lengkap : {name}</li>
    //         </ul>
    //         <ul className="flex items-center gap-x-2 border-y py-2">
    //           <li className="text-foreground">Technologies :</li>
    //         </ul>
    //         <ul className="flex items-center gap-x-2 border-y py-2">
    //           <li className="text-foreground">Technologies :</li>
    //         </ul>
    //         {/* <p className="whitespace-pre-line mt-2">{data.summary}</p> */}
    //       </DialogDescription>
    //     </DialogHeader>
    //     <DialogFooter>
    //       <Link href={`/`} className={buttonVariants({ variant: "default" })}>
    //         Details
    //       </Link>
    //     </DialogFooter>
    //   </DialogContent>
  );
};
