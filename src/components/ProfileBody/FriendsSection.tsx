import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import {
  useFriendCountQuery,
  useGetUserFriendRequestsQuery,
} from "../../generated/graphql";
import Friend from "./Friend";

interface Props {
  id: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const FriendSection: React.FC<Props> = ({ id, setActiveTab }) => {
  const [{ data: count }] = useFriendCountQuery({ variables: { userId: id } });
  const [{ data: friends }] = useGetUserFriendRequestsQuery({
    variables: { userId: id, limit: 2 },
  });

  return (
    <Box pt="20px" px="16px" bg="secondary" borderRadius="8px" w="100%">
      <Flex align="center" justify="space-between">
        <Heading
          fontSize="22px"
          onClick={() => setActiveTab(2)}
          _hover={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Friends
        </Heading>
        <Button
          variant="basic"
          color="active"
          fontWeight="300"
          fontSize="18px"
          onClick={() => setActiveTab(2)}
        >
          See All Friends
        </Button>
      </Flex>
      <Text fontSize="18px" color="gray">
        {count?.friendCount} {count?.friendCount == 1 ? "friend" : "friends"}
      </Text>
      <Flex justify="center">
        <Flex wrap="wrap" mt="20px" justify="space-between" w="100%">
          {friends?.getUserFriendRequests.map((friend) => (
            <Friend data={friend} key={friend.friend._id} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default FriendSection;
