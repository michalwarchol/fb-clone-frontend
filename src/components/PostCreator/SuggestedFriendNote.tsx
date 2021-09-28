import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  FriendRequestWithFriend,
  useGetImageQuery,
} from "../../generated/graphql";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  friend: FriendRequestWithFriend;
  tagged: { _id: number; username: string }[];
  setTagged: React.Dispatch<
    React.SetStateAction<
      {
        _id: number;
        username: string;
      }[]
    >
  >;
}

const SuggestedFriendNote: React.FC<Props> = ({
  friend,
  tagged,
  setTagged,
}) => {
  const [{ data: avatar }] = useGetImageQuery({
    variables: { imageId: friend.friend.avatarId },
    pause: !friend,
  });

  const handleClick = () => {
    const isTagged = tagged.filter((tag) => tag._id == friend.friend._id);
    let t = tagged.concat();
    if (isTagged.length) {
      t = t.filter((tag) => tag._id != friend.friend._id);
      setTagged(t);
      return;
    }
    t.push({ _id: friend.friend._id, username: friend.friend.username });
    setTagged(t);
  };

  let isTagged = tagged.filter((tag) => tag._id == friend.friend._id);
  let bg = "tertiary";
  if (isTagged.length) {
    bg = "hover";
  }

  return (
    <Flex
      align="center"
      py="10px"
      px="8px"
      bg={bg}
      _hover={{ backgroundColor: "hover" }}
      cursor="pointer"
      borderRadius="8px"
      onClick={handleClick}
    >
      <Avatar
        size="md"
        src={avatar?.getImage ? base64ToObjectURL(avatar.getImage) : null}
      />
      <Text color="textPrimary" ml="10px">
        {friend.friend.username}
      </Text>
    </Flex>
  );
};
export default SuggestedFriendNote;
