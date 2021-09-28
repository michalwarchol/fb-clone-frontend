import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { FaCheck, FaUserPlus } from "react-icons/fa";
import {
  FriendSuggestion,
  NotificationType,
  useCreateFriendRequestMutation,
  useCreateNotificationMutation,
  useGetImageQuery,
} from "../../generated/graphql";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  friend: FriendSuggestion;
}

const Suggestion: React.FC<Props> = ({ friend }) => {
  const [{ data: avatar }] = useGetImageQuery({
    variables: { imageId: friend.friend.avatarId },
  });
  const [, createFriendRequest] = useCreateFriendRequestMutation();
  const [, createNotification] = useCreateNotificationMutation();
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const router = useRouter();

  const goToProfile = () => {
    router.push("/profile/" + friend.friend._id);
  };

  const sendRequest = async (e: SyntheticEvent) => {
    setRequestSent(true);
    e.stopPropagation();
    await createFriendRequest({ receiver: friend.friend._id });
    await createNotification({
      input: {
        info: "sent you a friend request.",
        receiverId: friend.friend._id,
        type: NotificationType.FriendReq,
        link: "/friends",
      },
    });
  };

  return (
    <Flex
      p="10px"
      w="180px"
      borderRadius="8px"
      cursor="pointer"
      transition="background-color 0.2s ease-in-out"
      _hover={{ backgroundColor: "tertiary" }}
      onClick={goToProfile}
    >
      <Box w="100%">
        <Box h="220px" w="160px" borderRadius="8px" overflow="hidden">
          <Image
            src={avatar?.getImage ? base64ToObjectURL(avatar.getImage) : null}
            w="100%"
            h="100%"
            objectFit="cover"
            fallbackSrc="https://gravatar.com/avatar/43484bed7620ffc1fec5d482af33bfae?s=400&d=mp&r=x"
          />
        </Box>
        <Box>
          <Text fontWeight="bold">{friend.friend.username}</Text>
          <Text>{friend.mutual > 0 && friend.mutual + " mutual friends"}</Text>
          <Button
            variant="basic"
            bg="tertiary"
            onClick={sendRequest}
            leftIcon={requestSent ? <FaCheck /> : <FaUserPlus />}
          >
            {requestSent ? "Request sent" : "Send Request"}
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
export default Suggestion;
