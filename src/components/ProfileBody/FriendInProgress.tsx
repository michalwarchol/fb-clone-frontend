import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { SyntheticEvent } from "react";
import {
  FriendRequestWithFriend,
  useAcceptFriendRequestMutation,
  useGetImageQuery,
  useRemoveFriendRequestMutation,
} from "../../generated/graphql";

interface Props {
  data: FriendRequestWithFriend;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

const FriendInProgress: React.FC<Props> = ({ data, setId }) => {
  const [{ data: avatar }] = useGetImageQuery({
    variables: { imageId: data?.friend.avatarId },
    pause: !data,
  });

  const confirm = async (e: SyntheticEvent) => {
    e.stopPropagation();
    await acceptRequest({ userId: data.friend._id });
  };

  const remove = async (e: SyntheticEvent) => {
    e.stopPropagation();
    await removeRequest({ userId: data.friend._id });
  };

  const [, acceptRequest] = useAcceptFriendRequestMutation();
  const [, removeRequest] = useRemoveFriendRequestMutation();

  return (
    <Flex
      h="82px"
      _hover={{ backgroundColor: "hover" }}
      cursor="pointer"
      px="8px"
      borderRadius="8px"
      onClick={()=>setId(data.friend._id)}
    >
      <Flex align="center" w="20%">
        <Image
          borderRadius="50%"
          w="60px"
          h="60px"
          objectFit="cover"
          src={avatar?.getImage}
          fallbackSrc="https://gravatar.com/avatar/43484bed7620ffc1fec5d482af33bfae?s=400&d=mp&r=x"
        />
      </Flex>
      <Flex justify="center" direction="column" ml="4px" w="80%">
        <Box mb="4px">
          <Text fontWeight="bold">{data?.friend.username}</Text>
        </Box>
        <Flex justify="space-between">
          <Button bg="active" px="30px" h="36px" onClick={confirm} _hover={{backgroundColor: "active"}}>
            Confirm
          </Button>
          <Button
            variant="basic"
            bg="tertiary"
            px="30px"
            h="36px"
            onClick={remove}
          >
            Remove
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default FriendInProgress;
