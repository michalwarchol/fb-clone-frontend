import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useGetInProgressFriendRequestsQuery } from "../../generated/graphql";
import FriendInProgress from "./FriendInProgress";

interface Props {
  setId: React.Dispatch<React.SetStateAction<number>>;
}

const FriendsBar: React.FC<Props> = ({ setId }) => {
  const [{ data }] = useGetInProgressFriendRequestsQuery();
  return (
    <Box
      w="360px"
      h="100vh"
      position="fixed"
      left="0"
      pt="68px"
      px="8px"
      bg="secondary"
      borderRight="1px"
      borderColor="hover"
    >
      <Heading fontSize="26px" mb="10px">
        Friends
      </Heading>
      <Text>{data?.getInProgressFriendRequests.length} Friend Requests</Text>
      <Box>
        {data &&
          data.getInProgressFriendRequests.map((friend) => (
            <FriendInProgress
              data={friend}
              setId={setId}
              key={friend.friend._id}
            />
          ))}
      </Box>
    </Box>
  );
};
export default FriendsBar;
