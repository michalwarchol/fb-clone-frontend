import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useMemo } from "react";
import { Story, useGetImageQuery } from "../../generated/graphql";
import NextLink from "next/link";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  story: Story;
}

const Shortcut: React.FC<Props> = ({ story }) => {
  const [{ data }] = useGetImageQuery({
    variables: { imageId: story.imageId },
    pause: !story.imageId,
  });

  const [{ data: avatar }] = useGetImageQuery({
    variables: { imageId: story.creator.avatarId },
  });

  const memoizedImage = useMemo(
    () => base64ToObjectURL(data?.getImage),
    [data]
  );
  const memoizedAvatar = useMemo(
    () => base64ToObjectURL(avatar?.getImage),
    [avatar]
  );

  let content = <Box></Box>;
  if (story.imageId) {
    content = (
      <Image
        src={data?.getImage ? memoizedImage : null}
        objectFit="cover"
        h="100%"
      />
    );
  } else {
    content = (
      <Flex
        bgGradient={story.gradient}
        h="100%"
        align="center"
        justify="center"
      >
        <Text fontFamily={story.font} fontSize="10px">
          {story.text}
        </Text>
      </Flex>
    );
  }

  return (
    <NextLink href={`/stories?id=${story.creator._id}`}>
      <Box
        w="16%"
        h={{ base: "140px", md: "190px" }}
        borderRadius="8px"
        overflow="hidden"
        _hover={{ cursor: "pointer", filter: "brightness(80%)" }}
      >
        {content}
        <Box position="relative" w="100%" h="100%" top="-100%">
          <Avatar
            position="absolute"
            top="5%"
            left="2%"
            size="sm"
            src={avatar?.getImage ? memoizedAvatar : null}
          />
          <Text position="absolute" bottom="0" fontWeight="bold">
            {story.creator.username}
          </Text>
        </Box>
      </Box>
    </NextLink>
  );
};
export default Shortcut;
