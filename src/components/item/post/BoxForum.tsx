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
import SubscribeLeaveToggle from "../SubscribeLeaveToggle";
import { Subreddit, User } from "@prisma/client";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";
import { useState } from "react";
import { formatUrl } from "@/lib/utils";

moment.locale("id");

type BoxInfoProps = {
  forum: Subreddit & {
    Creator: User;
  };
  sessionId: string;
  memberCount: number;
  postsCount: number;
  isSubscribed: boolean;
  slug: string;
};

const BoxForum = ({
  forum,
  sessionId,
  memberCount,
  postsCount,
  isSubscribed,
  slug,
}: BoxInfoProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setSlug = formatUrl(slug);
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
          Forum {forum.name}
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
            <Flex direction="column" flexGrow={1}>
              <Text>{memberCount}</Text>
              <Text>Anggota</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>{postsCount}</Text>
              <Text>Jumlah Post</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontSize="10pt"
            fontWeight="500"
          >
            <Box>
              Dibuat pada{" "}
              <Text display="inline" fontWeight="600">
                {moment(forum.createdAt).format("LL")}
              </Text>
            </Box>
          </Flex>
          <Flex
            align="center"
            width="100%"
            p={1}
            fontSize="10pt"
            fontWeight="500"
          >
            <Box>
              Dibuat oleh{" "}
              <Text display="inline" fontWeight="600">
                {forum.Creator.name}
              </Text>
            </Box>
          </Flex>
          <Divider />
          {forum.Creator.id !== sessionId ? (
            <SubscribeLeaveToggle
              isSubscribed={isSubscribed}
              subredditId={forum.id}
              subredditName={forum.name}
            />
          ) : null}

          {forum.Creator.id === sessionId ? (
            <div className="mx-auto">
              <Link
                href={`/createpost/${setSlug}/submit`}
                prefetch={false}
                passHref
              >
                <Button
                  isLoading={isLoading}
                  loadingText="Loading"
                  spinnerPlacement="start"
                  onClick={() => setIsLoading(true)}
                  colorScheme="teal"
                  width="fit-content"
                  height="30px"
                >
                  Buat Postingan
                </Button>
              </Link>
            </div>
          ) : null}

          {/* {user && (
                        <Link
                            href={`/r/${currentCommunity.id}/submit`}
                            prefetch={false}
                            passHref
                        >
                            <Button height="30px">Create Post</Button>
                        </Link>
                    )}
                    {user?.uid === currentCommunity.creatorID && (
                        <ChangeCommunityPhoto
                            currentCommunity={currentCommunity}
                            communitySnippetState={communitySnippetState}
                            setCommunitySnippetState={setCommunitySnippetState}
                            uid={user.uid}
                        />
                    )} */}
        </Stack>
      </Flex>
    </Box>
  );
};

export default BoxForum;
