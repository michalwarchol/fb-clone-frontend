import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { RegularCommentFragment } from "../../generated/graphql";

interface Props {
  data: RegularCommentFragment;
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
