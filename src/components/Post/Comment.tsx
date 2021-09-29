import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Comment, useGetImageQuery } from "../../generated/graphql";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  data: Comment;
}

const CommentNote: React.FC<Props> = ({ data }) => {
  const [{ data: avatar }] = useGetImageQuery({
    variables: { imageId: data.creator.avatarId },
  });
  const avatarImage = useMemo(
    () => base64ToObjectURL(avatar?.getImage),
    [avatar]
  );
  return (
    <Flex direction="row" mt="4px">
      <Avatar size="sm" mr="10px" src={avatarImage} />
      <Box bg="hover" borderRadius="18px" px="12px" py="8px">
        <Text fontWeight="bold">{data.creator.username}</Text>
        <Text wordBreak="break-word">{data.text}</Text>
      </Box>
    </Flex>
  );
};

export default CommentNote;
