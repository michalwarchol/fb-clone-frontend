import { Box, Flex, Image, Text } from "@chakra-ui/react";
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
      <Flex w={{base: "50%", lg: "30%"}} cursor="pointer" mb="20px" direction="column" align="center">
        <Box w={{base: "120px", lg: "90px"}} h={{base: "120px", lg: "90px"}} borderRadius="4px" overflow="hidden">
          <Image
            src={image?.getImage}
            boxSize="100%"
            objectFit="cover"
            fallbackSrc="https://gravatar.com/avatar/43484bed7620ffc1fec5d482af33bfae?s=400&d=mp&r=x"
          />
        </Box>
        <Text>{data?.friend.username}</Text>
      </Flex>
    </NextLink>
  );
};
export default Friend;
