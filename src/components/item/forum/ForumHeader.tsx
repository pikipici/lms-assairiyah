"use client";

import { Subreddit } from "@prisma/client";
import { Flex, Img, Box, Text, Button } from "@chakra-ui/react";

interface ForumHeaderProps {
  data: Subreddit;
}

const ForumHeader = ({ data }: ForumHeaderProps) => {
  return (
    <Flex
      className="w-full"
      direction="column"
      width="100%"
      height={data?.bgImg ? "350px" : "350px"}
    >
      {data?.bgImg ? (
        <Img height="80%" objectFit="cover" src={data.bgImg} />
      ) : (
        <Box height="80%" bg="blue.400" />
      )}
      <Flex
        justify="center"
        bg="white"
        height={data.bgImg ? "20%" : "unset"}
        flexGrow={data.bgImg ? "unset" : 1}
      >
        <Flex width="95%" maxWidth="860px">
          {data?.imageUrl ? (
            <Img
              src={data?.imageUrl}
              borderRadius="full"
              boxSize="60px"
              alt="Forum Profile Picture"
              position="relative"
              top="-3"
              color="blue.500"
              border="4px solid white"
              bg="white"
            />
          ) : (
            <Img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
              boxSize="4em"
              position="relative"
              top={-4}
              border="4px solid white"
              borderRadius="50%"
              bg="white"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr="6">
              <Text fontWeight="800" fontSize="16pt">
                {data.name}
              </Text>
              <Text fontWeight="600" fontSize="10pt" color="gray.400">
                Forum {data.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForumHeader;
