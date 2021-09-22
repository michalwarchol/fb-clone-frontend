import {
  Button,
  CircularProgress,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiUserCheck } from "react-icons/bi";
import { FaCheck, FaUserCheck, FaUserPlus } from "react-icons/fa";
import {
  NotificationType,
  useAcceptFriendRequestMutation,
  useCreateFriendRequestMutation,
  useCreateNotificationMutation,
  User,
  useRemoveFriendRequestMutation,
  UserRequest,
} from "../../generated/graphql";

interface Props {
  user: User;
  isFriend: UserRequest;
  loggedUserId: number;
}

//STATES
// 1. no friends, no request sent
// 2. no friends, I sent a request
// 3. no friends, user sent a request and status=in-progress
// 4. friends

const AddFriendButton: React.FC<Props> = ({ user, isFriend, loggedUserId }) => {
  const [{ fetching: createFetching }, createFriendRequest] =
    useCreateFriendRequestMutation();
  const [{ fetching: removeFetching }, removeFriendRequest] =
    useRemoveFriendRequestMutation();
  const [{ fetching: acceptFetching }, acceptFriendRequest] =
    useAcceptFriendRequestMutation();
  const [, createNotification] = useCreateNotificationMutation();

  const [isOpen, setIsOpen] = useState(false);

  const handleAddFriend = async () => {
    await createFriendRequest({ receiver: user._id });
    await createNotification({input: {
      info: "sent you a friend request.",
      receiverId: user._id,
      type: NotificationType.FriendReq,
      link: "/friends"
    }})
  };

  const handleAcceptRequest = async () => {
    await acceptFriendRequest({ userId: user._id });
    await createNotification({input: {
      info: "accepted your friend request.",
      receiverId: user._id,
      type: NotificationType.FriendAccept,
      link: "/profile/"+loggedUserId
    }})
    setIsOpen(false);
  };

  const handleRemoveRequest = async () => {
    await removeFriendRequest({ userId: user._id });
    setIsOpen(false);
  };
  let body = null;
  if (isFriend?.friendRequest == null) {
    //no friends, no request sent
    body = (
      <Button
        leftIcon={!createFetching && <FaUserPlus />}
        variant="active"
        onClick={handleAddFriend}
      >
        {createFetching ? (
          <CircularProgress color="active" isIndeterminate size={10} />
        ) : (
          "Add Friend"
        )}
      </Button>
    );
  } else if (
    isFriend?.friendRequest &&
    !isFriend?.isSender &&
    isFriend?.friendRequest.status == "in-progress"
  ) {
    //no friends, I sent a request
    body = (
      <Button leftIcon={<FaCheck />} variant="active">
        Request sent
      </Button>
    );
  } else if (
    isFriend?.friendRequest &&
    isFriend?.isSender &&
    isFriend?.friendRequest.status == "in-progress"
  ) {
    //no friends, user sent a request
    body = (
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnBlur
      >
        <PopoverTrigger>
          <Button
            leftIcon={!(acceptFetching || removeFetching) && <BiUserCheck />}
            variant="active"
            onClick={() => setIsOpen(true)}
          >
            {acceptFetching || removeFetching ? (
              <CircularProgress color="active" isIndeterminate size={10} />
            ) : (
              "Respond"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent bg="secondary">
          <PopoverBody>
            <Button
              variant="basic"
              onClick={handleAcceptRequest}
              fontWeight="bold"
              w="100%"
            >
              <Text w="100%" textAlign="start">
                Confirm
              </Text>
            </Button>
            <Button
              variant="basic"
              onClick={handleRemoveRequest}
              fontWeight="bold"
              w="100%"
            >
              <Text w="100%" textAlign="start">
                Remove
              </Text>
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  } else {
    //friends or query not loaded
    body = (
      <Button leftIcon={<FaUserCheck />} variant="basic" bg="tertiary">
        {createFetching ? (
          <CircularProgress color="active" isIndeterminate size={10} />
        ) : (
          "Friends"
        )}
      </Button>
    );
  }

  return body;
};
export default AddFriendButton;
