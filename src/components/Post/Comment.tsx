import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Comment } from "../../generated/graphql";

interface Props {
  data: Comment;
}

const CommentNote: React.FC<Props> = ({ data }) => {
  return (
    <Flex direction="row" mt="4px">
      <Avatar size="sm" mr="10px" />
      <Box bg="hover" borderRadius="18px" px="12px" py="8px">
        <Text fontWeight="bold">{data.creator.username}</Text>
        <Text wordBreak="break-word">{data.text}</Text>
      </Box>
    </Flex>
  );
};

export default CommentNote;