import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useGetUserFriendRequestsQuery } from "../../generated/graphql";
import FriendNote from "./FriendNode";

interface Props {
  id: number;
}

const FriendsTab: React.FC<Props> = ({ id }) => {
  const limit = 10;
  const [{ data }] = useGetUserFriendRequestsQuery({
    variables: { userId: id, limit, skip: 0 },
  });

  return (
    <Box
      w={{ base: "100%", lg: "876px" }}
      mt="16px"
      bg="secondary"
      borderRadius="8px"
    >
      <Box m="20px">
        <Text fontSize="24px" fontWeight="bold">
          Friends
        </Text>
      </Box>
      <Box mx="auto">
        <Flex mx="20px" direction="row" wrap="wrap" justify="space-between">
          {data?.getUserFriendRequests.friendRequestsWithFriends.map((note) => (
            <FriendNote friendRequestWithFriend={note} />
          ))}
        </Flex>
        {!data?.getUserFriendRequests.hasMore && (
          <Text textAlign="center" fontSize="24px" fontWeight="bold">
            No more friends to show
          </Text>
        )}
      </Box>
    </Box>
  );
};
export default FriendsTab;
