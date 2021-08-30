import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
  FriendRequestWithFriend,
  useGetImageQuery,
} from "../../generated/graphql";
import NextLink from "next/link";

interface Props {
  data: FriendRequestWithFriend;
}

const Friend: React.FC<Props> = ({ data }) => {
  const [{ data: image }] = useGetImageQuery({
    variables: { imageId: data.friend.avatarId },
    pause: !data,
  });
  return (
    <NextLink href="/profile/[id]" as={`/profile/${data.friend._id}`}>
      <Box w="30%" mx="4px" cursor="pointer" mb="20px">
        <Box w="100%px" h="100px" borderRadius="4px" overflow="hidden">
          <Image
            src={image?.getImage}
            w="100%"
            h="100%"
            objectFit="cover"
            fallbackSrc="https://gravatar.com/avatar/43484bed7620ffc1fec5d482af33bfae?s=400&d=mp&r=x"
          />
        </Box>
        <Text>{data?.friend.username}</Text>
      </Box>
    </NextLink>
  );
};
export default Friend;
