import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
  FriendRequestWithFriend,
  useGetImageQuery,
} from "../../generated/graphql";
import NextLink from "next/link";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  friendRequestWithFriend: FriendRequestWithFriend;
}

const FriendNote: React.FC<Props> = ({ friendRequestWithFriend }) => {
  const [{ data: image }] = useGetImageQuery({
    variables: { imageId: friendRequestWithFriend?.friend.avatarId },
  });

  return (
    <Box w="48%" borderRadius="8px" border="1px solid gray" m="4px" p="20px">
      <Flex w="100%">
        <Box
          w={{ base: "36px", lg: "80px" }}
          h={{ base: "36px", lg: "80px" }}
          overflow="hidden"
          borderRadius="8px"
        >
          <NextLink
            href="/profile/[id]"
            as={`/profile/${friendRequestWithFriend.friend._id}`}
          >
            <Image
              src={image?.getImage ? base64ToObjectURL(image.getImage) : null}
              w="100%"
              h="100%"
              objectFit="cover"
              fallbackSrc="https://gravatar.com/avatar/43484bed7620ffc1fec5d482af33bfae?s=400&d=mp&r=x"
              cursor="pointer"
            />
          </NextLink>
        </Box>
        <Flex ml="10px" align="center">
          <NextLink
            href="/profile/[id]"
            as={`/profile/${friendRequestWithFriend.friend._id}`}
          >
            <Text fontSize="20px" fontWeight="bold" cursor="pointer">
              {friendRequestWithFriend.friend.username}
            </Text>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
};
export default FriendNote;
