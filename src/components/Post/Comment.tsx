import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Comment, useGetImageQuery } from "../../generated/graphql";

interface Props {
  data: Comment;
}

const CommentNote: React.FC<Props> = ({ data }) => {
  const [{data: avatar}] = useGetImageQuery({variables: {imageId: data.creator.avatarId}})
  return (
    <Flex direction="row" mt="4px">
      <Avatar size="sm" mr="10px" src={avatar?.getImage} />
      <Box bg="hover" borderRadius="18px" px="12px" py="8px">
        <Text fontWeight="bold">{data.creator.username}</Text>
        <Text wordBreak="break-word">{data.text}</Text>
      </Box>
    </Flex>
  );
};

export default CommentNote;
