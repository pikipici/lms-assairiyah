"use client";

import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Balancer from "react-wrap-balancer";
import CustomSheet from "@/components/ui/Custom-UI/sheet/CustomSheet";
import { User } from "@prisma/client";
import { Session } from "next-auth";

type BoxInfoProps = {
  getUser: User | null;
  session: Session;
};

const BoxInfo = ({ getUser, session }: BoxInfoProps) => {
  return (
    <Box
      position="sticky"
      borderRadius="4px"
      overflow="hidden"
      top="15px"
      height="calc(100vh - 80px)"
    >
      <Flex
        justify="space-between"
        align="center"
        bg="#607274"
        p={3}
        color="white"
      >
        <Text fontSize="10pt" fontWeight="700">
          Laman Dashboard
        </Text>
      </Flex>
      <Flex justify="center" align="center" bg="white">
        <Stack width="100%" p="3">
          <Flex
            width="100%"
            textAlign="center"
            p={2}
            justify="center"
            align="center"
            fontSize="10pt"
            fontWeight="700"
          >
            <p className="text-zinc-500 text-center">
              <Balancer>
                Selamat Datang{" "}
                <span className="text-sky-500 font-bold dark:text-sky-400">
                  {session.user.name}
                </span>{" "}
                di Situs Resmi LMS MTs Assyairiyah Attahiriyah
              </Balancer>
            </p>
          </Flex>

          <Divider />
          <CustomSheet user={session.user} initialData={getUser}>
            Menu
          </CustomSheet>
        </Stack>
      </Flex>
    </Box>
  );
};

export default BoxInfo;
