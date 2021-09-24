import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useGetInProgressFriendRequestsQuery } from "../../generated/graphql";
import FriendInProgress from "./FriendInProgress";

interface Props {
  setId: React.Dispatch<React.SetStateAction<number>>;
  loggedUserId: number;
}

const FriendsBar: React.FC<Props> = ({ setId, loggedUserId }) => {
  const [{ data }] = useGetInProgressFriendRequestsQuery();
  return (
    <Box
      minW="360px"
      h="100vh"
      pt="68px"
      px="8px"
      bg="secondary"
      borderRight="1px"
      borderColor="hover"
      display="inline-block"
      position="sticky"
      top="0"
    >
      <Heading fontSize="26px" mb="10px">
        Friends
      </Heading>
      <Text>{data?.getInProgressFriendRequests.length} Friend Requests</Text>
      <Box w="100%">
        {data &&
          data.getInProgressFriendRequests.map((friend) => (
            <FriendInProgress
              data={friend}
              setId={setId}
              key={friend.friend._id}
              loggedUserId={loggedUserId}
            />
          ))}
      </Box>
    </Box>
  );
};
export default FriendsBar;
